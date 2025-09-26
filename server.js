const path = require("path");
const https = require("https");
const { createHash, createHmac } = require("crypto");

// Load environment variables from a local .env file when present. This keeps
// the server configuration flexible for local development while still allowing
// production environments to provide variables through their own mechanisms.
try {
    // eslint-disable-next-line global-require
    require("dotenv").config();
} catch (error) {
    // dotenv is optional at runtime; environments that already provide the
    // variables do not need it. Swallow the error to avoid crashing if the
    // dependency is not installed when the file is required in other contexts
    // (for example, during `npm run build`).
}

const express = require("express");

const app = express();
const PORT = Number.parseInt(process.env.PORT, 10) || 3000;

// Ensure JSON bodies are parsed for API routes. The payload is small, so the
// default 1MB limit is more than enough.
app.use(express.json());

// Serve the production build of the React application.
const buildDirectory = path.join(__dirname, "build");
app.use(express.static(buildDirectory));

const awsConfig = {
    bucket: process.env.AWS_S3_BUCKET_NAME,
    region: process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
    keyPrefix: process.env.AWS_S3_PREFIX || "surveys",
};

const RESPONSE_KEYS = [
    "age",
    "ageLabel",
    "gender",
    "q1",
    "q2",
    "q2OtherText",
    "q3",
    "q4",
    "q5",
];

const CSV_HEADERS = [
    "storedAt",
    "email",
    "initialEmail",
    "latestEmail",
    ...RESPONSE_KEYS,
];

// Keep the email sanitiser deterministic so follow-up submissions map to the
// same S3 prefix without introducing subtle differences between builds.
function sanitizeEmailForKey(email) {
    return email.toLowerCase().replace(/[^a-z0-9@._-]/g, "-");
}

function normalisePrefix(prefix) {
    if (!prefix) {
        return "";
    }

    const trimmed = prefix.replace(/^\/+/, "").replace(/\/+$/, "");
    if (!trimmed) {
        return "";
    }

    return `${trimmed}/`;
}

function buildSurveyObjectKey(email, prefix, date = new Date()) {
    const safeEmail = sanitizeEmailForKey(email);
    const timestamp = date.toISOString().replace(/[:.]/g, "-");
    const normalisedPrefix = normalisePrefix(prefix);
    return `${normalisedPrefix}${safeEmail}/${timestamp}.json`;
}

function buildCsvObjectKey(prefix) {
    const normalisedPrefix = normalisePrefix(prefix);
    return `${normalisedPrefix}all-responses.csv`;
}

function encodeRFC3986(component) {
    return encodeURIComponent(component).replace(/[*'()]/g, (character) =>
        `%${character.charCodeAt(0).toString(16).toUpperCase()}`
    );
}

function encodeS3Key(key) {
    return key
        .split("/")
        .map((segment) => encodeRFC3986(segment))
        .join("/");
}

function hashSha256(value) {
    return createHash("sha256").update(value, "utf8").digest("hex");
}

function sign(key, message) {
    return createHmac("sha256", key).update(message, "utf8").digest();
}

function getSignatureKey(secretAccessKey, dateStamp, regionName, serviceName) {
    const kDate = sign(`AWS4${secretAccessKey}`, dateStamp);
    const kRegion = sign(kDate, regionName);
    const kService = sign(kRegion, serviceName);
    return sign(kService, "aws4_request");
}

function buildCanonicalHeaders(headers) {
    const canonicalEntries = Object.entries(headers)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => [
            key.toLowerCase(),
            String(value).trim().replace(/\s+/g, " "),
        ])
        .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));

    const canonicalHeaders = canonicalEntries
        .map(([key, value]) => `${key}:${value}\n`)
        .join("");
    const signedHeaders = canonicalEntries.map(([key]) => key).join(";");

    return { canonicalHeaders, signedHeaders };
}

function uploadTextToS3({
    bucket,
    region,
    accessKeyId,
    secretAccessKey,
    sessionToken,
    key,
    body,
    contentType = "application/json",
}) {
    return new Promise((resolve, reject) => {
        if (!bucket || !region || !accessKeyId || !secretAccessKey) {
            reject(new Error("Incomplete AWS S3 configuration."));
            return;
        }

        const host = `${bucket}.s3.${region}.amazonaws.com`;
        const encodedKey = encodeS3Key(key);
        const method = "PUT";
        const service = "s3";
        const payloadHash = hashSha256(body);

        const now = new Date();
        const amzDate = now
            .toISOString()
            .replace(/[-:]/g, "")
            .replace(/\.\d{3}/, "");
        const dateStamp = amzDate.slice(0, 8);

        const headersForSigning = {
            host,
            "content-type": contentType,
            "x-amz-content-sha256": payloadHash,
            "x-amz-date": amzDate,
        };

        if (sessionToken) {
            headersForSigning["x-amz-security-token"] = sessionToken;
        }

        const { canonicalHeaders, signedHeaders } = buildCanonicalHeaders(
            headersForSigning
        );

        const canonicalRequest = [
            method,
            `/${encodedKey}`,
            "",
            canonicalHeaders,
            signedHeaders,
            payloadHash,
        ].join("\n");

        const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
        const stringToSign = [
            "AWS4-HMAC-SHA256",
            amzDate,
            credentialScope,
            hashSha256(canonicalRequest),
        ].join("\n");

        const signingKey = getSignatureKey(
            secretAccessKey,
            dateStamp,
            region,
            service
        );
        const signature = createHmac("sha256", signingKey)
            .update(stringToSign, "utf8")
            .digest("hex");

        const authorizationHeader =
            `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, ` +
            `SignedHeaders=${signedHeaders}, Signature=${signature}`;

        const requestHeaders = {
            "Content-Type": contentType,
            "Content-Length": Buffer.byteLength(body),
            "X-Amz-Content-Sha256": payloadHash,
            "X-Amz-Date": amzDate,
            Authorization: authorizationHeader,
        };

        if (sessionToken) {
            requestHeaders["X-Amz-Security-Token"] = sessionToken;
        }

        const requestOptions = {
            method,
            hostname: host,
            path: `/${encodedKey}`,
            headers: requestHeaders,
        };

        const request = https.request(requestOptions, (response) => {
            let responseBody = "";
            response.setEncoding("utf8");
            response.on("data", (chunk) => {
                responseBody += chunk;
            });
            response.on("end", () => {
                if (response.statusCode && response.statusCode >= 200 && response.statusCode < 300) {
                    resolve();
                } else {
                    const error = new Error(
                        `S3 upload failed with status code ${response.statusCode}`
                    );
                    error.statusCode = response.statusCode;
                    error.response = responseBody;
                    reject(error);
                }
            });
        });

        request.on("error", (error) => {
            reject(error);
        });

        request.write(body);
        request.end();
    });
}

function fetchObjectFromS3({
    bucket,
    region,
    accessKeyId,
    secretAccessKey,
    sessionToken,
    key,
}) {
    return new Promise((resolve, reject) => {
        if (!bucket || !region || !accessKeyId || !secretAccessKey) {
            reject(new Error("Incomplete AWS S3 configuration."));
            return;
        }

        const host = `${bucket}.s3.${region}.amazonaws.com`;
        const encodedKey = encodeS3Key(key);
        const method = "GET";
        const service = "s3";
        const payloadHash = hashSha256("");

        const now = new Date();
        const amzDate = now
            .toISOString()
            .replace(/[-:]/g, "")
            .replace(/\.\d{3}/, "");
        const dateStamp = amzDate.slice(0, 8);

        const headersForSigning = {
            host,
            "x-amz-content-sha256": payloadHash,
            "x-amz-date": amzDate,
        };

        if (sessionToken) {
            headersForSigning["x-amz-security-token"] = sessionToken;
        }

        const { canonicalHeaders, signedHeaders } = buildCanonicalHeaders(
            headersForSigning
        );

        const canonicalRequest = [
            method,
            `/${encodedKey}`,
            "",
            canonicalHeaders,
            signedHeaders,
            payloadHash,
        ].join("\n");

        const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
        const stringToSign = [
            "AWS4-HMAC-SHA256",
            amzDate,
            credentialScope,
            hashSha256(canonicalRequest),
        ].join("\n");

        const signingKey = getSignatureKey(
            secretAccessKey,
            dateStamp,
            region,
            service
        );
        const signature = createHmac("sha256", signingKey)
            .update(stringToSign, "utf8")
            .digest("hex");

        const authorizationHeader =
            `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, ` +
            `SignedHeaders=${signedHeaders}, Signature=${signature}`;

        const requestHeaders = {
            "X-Amz-Content-Sha256": payloadHash,
            "X-Amz-Date": amzDate,
            Authorization: authorizationHeader,
        };

        if (sessionToken) {
            requestHeaders["X-Amz-Security-Token"] = sessionToken;
        }

        const requestOptions = {
            method,
            hostname: host,
            path: `/${encodedKey}`,
            headers: requestHeaders,
        };

        const request = https.request(requestOptions, (response) => {
            let responseBody = "";
            response.setEncoding("utf8");
            response.on("data", (chunk) => {
                responseBody += chunk;
            });
            response.on("end", () => {
                if (
                    response.statusCode &&
                    response.statusCode >= 200 &&
                    response.statusCode < 300
                ) {
                    resolve(responseBody);
                } else if (response.statusCode === 404) {
                    resolve(null);
                } else {
                    const error = new Error(
                        `S3 download failed with status code ${response.statusCode}`
                    );
                    error.statusCode = response.statusCode;
                    error.response = responseBody;
                    reject(error);
                }
            });
        });

        request.on("error", (error) => {
            reject(error);
        });

        request.end();
    });
}

function escapeCsvValue(value) {
    if (value === null || value === undefined) {
        return "";
    }

    const stringValue = String(value);
    const escapedValue = stringValue.replace(/"/g, '""');
    const needsQuotes = /[",\n\r]/.test(escapedValue) || /^\s|\s$/.test(escapedValue);
    return needsQuotes ? `"${escapedValue}"` : escapedValue;
}

function buildCsvRow(record) {
    const values = [
        record.storedAt || "",
        record.email || "",
        record.initialEmail || "",
        record.latestEmail || "",
        ...RESPONSE_KEYS.map((key) =>
            record.responses && record.responses[key] !== undefined
                ? record.responses[key]
                : ""
        ),
    ];

    return `${values.map(escapeCsvValue).join(",")}\n`;
}

function isListBucketAccessDenied(error) {
    if (!error || error.statusCode !== 403 || typeof error.response !== "string") {
        return false;
    }

    return (
        error.response.includes("<Code>AccessDenied</Code>") &&
        error.response.includes("s3:ListBucket")
    );
}

async function appendSurveyToCsv(config, record) {
    const csvKey = buildCsvObjectKey(config.keyPrefix);
    const headerLine = CSV_HEADERS.join(",");
    let existingContent;

    try {
        existingContent = await fetchObjectFromS3({
            bucket: config.bucket,
            region: config.region,
            accessKeyId: config.accessKeyId,
            secretAccessKey: config.secretAccessKey,
            sessionToken: config.sessionToken,
            key: csvKey,
        });
    } catch (error) {
        if (isListBucketAccessDenied(error)) {
            existingContent = null;
        } else {
            throw error;
        }
    }


    let body;
    const csvRow = buildCsvRow(record);

    if (!existingContent) {
        body = `${headerLine}\n${csvRow}`;
    } else {
        let normalisedContent = existingContent;
        const firstLine = normalisedContent.split(/\r?\n/, 1)[0];
        if (firstLine !== headerLine) {
            normalisedContent = `${headerLine}\n${normalisedContent}`;
        }
        if (!/\r?\n$/.test(normalisedContent)) {
            normalisedContent += "\n";
        }
        body = `${normalisedContent}${csvRow}`;
    }

    await uploadTextToS3({
        bucket: config.bucket,
        region: config.region,
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
        sessionToken: config.sessionToken,
        key: csvKey,
        body,
        contentType: "text/csv",
    });
}

function sanitiseResponses(responses) {
    const cleaned = {};
    for (const key of RESPONSE_KEYS) {
        if (!(key in responses)) {
            cleaned[key] = null;
            continue;
        }

        const value = responses[key];
        if (value === null || value === undefined) {
            cleaned[key] = null;
        } else if (typeof value === "string") {
            const trimmed = value.trim();
            cleaned[key] = trimmed.length > 0 ? trimmed : null;
        } else {
            cleaned[key] = value;
        }
    }

    return cleaned;
}

app.post("/api/surveys", async (req, res) => {
    const { email, initialEmail, latestEmail, responses } = req.body || {};

    const primaryEmail =
        typeof initialEmail === "string" && initialEmail.trim().length > 0
            ? initialEmail.trim()
            : typeof email === "string" && email.trim().length > 0
              ? email.trim()
              : typeof latestEmail === "string" && latestEmail.trim().length > 0
                ? latestEmail.trim()
                : "";

    if (!primaryEmail) {
        res.status(400).json({ error: "이메일 주소가 필요합니다." });
        return;
    }

    if (!responses || typeof responses !== "object" || Array.isArray(responses)) {
        res.status(400).json({ error: "설문 응답 형식이 올바르지 않습니다." });
        return;
    }

    if (
        !awsConfig.bucket ||
        !awsConfig.region ||
        !awsConfig.accessKeyId ||
        !awsConfig.secretAccessKey
    ) {
        res.status(500).json({
            error: "서버의 AWS S3 구성이 완료되지 않았습니다. 환경 변수를 확인해주세요.",
        });
        return;
    }

    const now = new Date();
    const storedAt = now.toISOString();
    const latest =
        typeof latestEmail === "string" && latestEmail.trim().length > 0
            ? latestEmail.trim()
            : primaryEmail;

    const record = {
        email: primaryEmail,
        initialEmail: primaryEmail,
        latestEmail: latest,
        responses: sanitiseResponses(responses),
        storedAt,
    };

    const objectKey = buildSurveyObjectKey(primaryEmail, awsConfig.keyPrefix, now);
    const body = `${JSON.stringify(record, null, 2)}\n`;

    try {
        await uploadTextToS3({
            bucket: awsConfig.bucket,
            region: awsConfig.region,
            accessKeyId: awsConfig.accessKeyId,
            secretAccessKey: awsConfig.secretAccessKey,
            sessionToken: awsConfig.sessionToken,
            key: objectKey,
            body,
            contentType: "application/json",
        });
        await appendSurveyToCsv(awsConfig, record);
        res.status(201).json({ success: true });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to store survey artifacts in S3", error);
        res.status(502).json({
            error: "설문 응답을 저장하는 동안 오류가 발생했습니다. 서버 로그를 확인해주세요.",
        });
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(buildDirectory, "index.html"));
});

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
