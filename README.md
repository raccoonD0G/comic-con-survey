# Comic-Con Survey

이 프로젝트는 React로 작성된 설문 인터페이스와 Express 기반의 백엔드를 하나의 Node.js 애플리케이션으로 묶어, 설문 응답을 AWS S3 버킷에 JSON 파일로 저장합니다. 각 제출물은 설문을 **처음 시작할 때 입력한 이메일 주소** 아래에 타임스탬프별로 쌓이며, 동일 이메일로 다시 참여해도 최초 이메일과 계속 매핑됩니다.

아래 문서를 따르면 AWS 초보자도 EC2 위에 애플리케이션을 배포하고, 설문 결과를 같은 리전의 S3 버킷에 안전하게 보관할 수 있습니다.

---

## 1. 준비물 요약

| 항목 | 설명 |
| --- | --- |
| AWS 계정 | S3와 EC2를 사용할 수 있어야 합니다. (무료 티어 가능) |
| 도메인 (선택) | Route 53 등에서 구입한 도메인을 연결하면 접근성이 좋아집니다. |
| 로컬 터미널 | macOS, Linux, WSL, Git Bash 등 SSH가 가능한 환경 |

---

## 2. S3 버킷과 IAM 자격 증명 만들기

1. **리전 선택**
   - AWS 콘솔 우측 상단에서 EC2를 띄울 리전을 고릅니다. 이후 단계에서는 동일한 리전을 계속 사용합니다.

2. **S3 버킷 생성**
   1. 서비스 검색창에 “S3” 입력 → **Create bucket** 클릭.
   2. **Bucket name**은 전 세계에서 유일해야 하므로 `comic-con-survey-<임의의-문자열>`처럼 지정합니다.
   3. **AWS Region**은 1단계에서 선택한 리전과 동일하게 설정합니다.
   4. **Block all public access** 체크박스는 그대로 둡니다(공개 필요 없음).
   5. 나머지는 기본값으로 둔 뒤 **Create bucket**을 클릭합니다.

3. **IAM 정책 생성**
   1. 콘솔에서 **IAM** → **Policies** → **Create policy**.
   2. **JSON** 탭에서 아래 정책을 붙여 넣고 `YOUR_BUCKET_NAME`만 방금 만든 버킷 이름으로 바꿉니다.

      ```json
      {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Sid": "AllowSurveyUploads",
            "Effect": "Allow",
            "Action": [
              "s3:PutObject"
            ],
            "Resource": "arn:aws:s3:::YOUR_BUCKET_NAME/*"
          }
        ]
      }
      ```

   3. 검토 후 **Create policy**로 저장합니다.

4. **IAM 사용자 만들기**
   1. IAM → **Users** → **Add users**.
   2. 사용자 이름은 `comic-con-survey-uploader`처럼 정하고, **Access key - Programmatic access**를 선택합니다.
   3. **Permissions** 단계에서 방금 만든 정책을 연결합니다.
   4. 생성이 끝나면 **Access key ID**와 **Secret access key**를 다운로드하거나 안전한 곳에 복사합니다. (임시 자격 증명을 쓰면 세션 토큰도 함께 받아야 합니다.)

5. **버킷 구조 요약**
   - 애플리케이션은 설문을 최초 제출할 때 입력한 이메일 주소를 디렉터리 이름으로 사용합니다.
   - 각 제출은 `surveys/<최초_이메일>/<ISO_타임스탬프>.json` 경로에 저장됩니다.

---

## 3. EC2 인스턴스 만들고 접속하기

1. **인스턴스 생성**
   1. AWS 콘솔에서 **EC2** → **Instances** → **Launch instances**.
   2. 이름은 `comic-con-survey-prod`처럼 지정합니다.
   3. **Application and OS Images (AMI)**: Ubuntu Server 22.04 LTS 혹은 Amazon Linux 2023 선택.
   4. **Instance type**: `t3.small` 이상 추천 (무료 티어라면 `t2.micro`도 가능).
   5. **Key pair (login)**: 기존 키를 쓰거나 새 `.pem` 키를 생성합니다.
   6. **Network settings**: 보안 그룹을 새로 만들고 아래 규칙을 추가합니다.
      - SSH: TCP 22, 소스 `My IP`.
      - HTTP: TCP 80, 소스 `0.0.0.0/0`.
      - (선택) 애플리케이션 포트 3000/3001을 직접 노출하고 싶다면 별도 규칙을 추가합니다.
   7. 스토리지는 기본 8GB gp3로 충분하며 필요 시 확장합니다.
   8. **Launch instance** 버튼을 눌러 생성합니다.

2. **공인 IP 확인**
   - 생성 직후 EC2 목록에서 인스턴스를 선택하면 **Public IPv4 address**가 보입니다. 이후 SSH 및 브라우저 접속에 사용합니다.

3. **SSH 접속**
   ```bash
   # Ubuntu 기준 (Amazon Linux는 ec2-user)
   ssh -i /path/to/key.pem ubuntu@<EC2_PUBLIC_IP>
   ```
   - 키 파일 권한이 `0600`이 아니면 `chmod 600 /path/to/key.pem`으로 수정합니다.

4. **기본 패키지 업데이트 및 필수 도구 설치**
   - Ubuntu
     ```bash
     sudo apt update && sudo apt upgrade -y
     sudo apt install -y git nodejs npm
     ```
   - Amazon Linux 2023
     ```bash
     sudo dnf update -y
     sudo dnf install -y git nodejs npm
     ```
   - Node 18 이상이 필요합니다. 기본 패키지가 낮다면 [NodeSource](https://github.com/nodesource/distributions#debinstall) 스크립트를 사용해 최신 버전을 설치하세요.

---

## 4. 애플리케이션 배포

1. **프로젝트 코드 내려받기**
   ```bash
   git clone https://github.com/<your-account>/comic-con-survey.git
   cd comic-con-survey
   ```
   - GitHub를 사용하지 않는다면 `scp`나 S3를 통해 압축 파일을 업로드한 뒤 인스턴스에서 압축을 해제합니다.

2. **환경 변수(.env) 작성**
   ```bash
   cat <<'EOF' > .env
   AWS_ACCESS_KEY_ID=<IAM_ACCESS_KEY>
   AWS_SECRET_ACCESS_KEY=<IAM_SECRET_KEY>
   AWS_REGION=<리전 예: ap-northeast-2>
   AWS_S3_BUCKET_NAME=<버킷 이름>
   AWS_S3_PREFIX=surveys
   PORT=3000
   # 임시 자격 증명을 쓴다면 아래 주석을 해제하고 입력하세요
   # AWS_SESSION_TOKEN=<세션 토큰>
   EOF
   chmod 600 .env
   ```
   - `.env`는 민감 정보이므로 권한을 제한합니다.

3. **의존성 설치 및 빌드**
   ```bash
   npm install
   npm run build
   ```

4. **서버 실행 (테스트)**
   ```bash
   PORT=3000 node server.js
   ```
   - 터미널에 `Server running at http://localhost:3000`이 출력되면 성공입니다.
   - 브라우저에서 `http://<EC2_PUBLIC_IP>:3000`으로 접속해 설문을 제출하면 S3에 JSON 파일이 생깁니다.

5. **백그라운드 서비스 등록 (선택)**
   - 지속 실행을 원하면 [PM2](https://pm2.keymetrics.io/)나 `systemd`를 사용합니다.
   - PM2 예시:

     ```bash
     sudo npm install -g pm2
     PORT=3000 pm2 start server.js --name comic-con-survey
     pm2 startup systemd
     pm2 save
     ```

---

## 5. HTTP(80번 포트)로 노출하기

1. **간단한 방법: 애플리케이션 포트 열기**
   - 보안 그룹에서 TCP 3000을 `0.0.0.0/0`으로 허용하면 됩니다. 다만 URL이 `http://<IP>:3000` 형태가 됩니다.

2. **권장: Nginx 리버스 프록시 사용**
   ```bash
   sudo apt install -y nginx   # Amazon Linux는 sudo dnf install -y nginx
   ```
   - `/etc/nginx/sites-available/comic-con-survey` (Amazon Linux는 `/etc/nginx/conf.d/`)에 아래 내용을 추가합니다.

     ```nginx
     server {
       listen 80;
       server_name _;

       location / {
         proxy_pass http://127.0.0.1:3000;
         proxy_set_header Host $host;
         proxy_set_header X-Real-IP $remote_addr;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }
     }
     ```

   - Ubuntu일 경우:
     ```bash
     sudo ln -s /etc/nginx/sites-available/comic-con-survey /etc/nginx/sites-enabled/
     sudo nginx -t
     sudo systemctl restart nginx
     ```
   - 이제 `http://<EC2_PUBLIC_IP>/`로 접속하면 됩니다. 도메인이 있다면 DNS A 레코드를 이 IP로 연결합니다.

3. **HTTPS 적용 (선택)**
   - 장기 운영 시 AWS Certificate Manager(ACM)에서 인증서를 발급하고, 로드 밸런서 혹은 Nginx + Certbot으로 HTTPS를 구성합니다.

---

## 6. 업로드 확인 및 문제 해결

1. **S3에서 확인**
   - S3 콘솔 → 버킷 → `surveys/` 폴더(또는 설정한 접두사) → 이메일 디렉터리 → 타임스탬프 파일을 클릭합니다.
   - JSON 예시:

     ```json
     {
       "email": "user@example.com",
       "initialEmail": "user@example.com",
       "latestEmail": "user@example.com",
       "responses": {
         "age": "20s",
         "ageLabel": "20대",
         "gender": "female",
         "q1": "superFun",
         "q2": "interactivity",
         "q2OtherText": null,
         "q3": "fashion",
         "q4": "definitelyYes",
         "q5": "tooMuchEffort"
       },
       "storedAt": "2025-09-24T05:40:09.091Z"
     }
     ```

2. **로그 확인**
   - 서버 콘솔: 에러 발생 시 HTTP 500과 함께 원인을 출력합니다.
   - PM2 사용 시 `pm2 logs comic-con-survey`.
   - `systemd` 사용 시 `journalctl -u comic-con-survey`.

3. **자격 증명 오류**
   - IAM 정책이 `s3:PutObject`를 허용하는지, 버킷 이름이 정확한지, 리전이 일치하는지 확인합니다.
   - 임시 자격 증명이라면 `AWS_SESSION_TOKEN`이 필요합니다.

4. **네트워크 문제**
   - 보안 그룹/방화벽에 포트가 열려 있는지 확인합니다.
   - Nginx 재시작 후에도 502가 나온다면 백엔드 프로세스가 정상 실행 중인지 확인합니다.

---

## 7. 로컬 개발 환경

1. **환경 변수 설정**
   - `.env` 파일을 로컬에도 생성합니다 (자격 증명은 IAM 사용자의 키를 재사용하거나 로컬 전용 키를 발급).

2. **개발 모드 실행**
   ```bash
   npm install
   npm start            # 프런트엔드 개발 서버(포트 3000)
   PORT=3001 node server.js
   ```
   - `package.json`의 `proxy` 설정 덕분에 프런트엔드에서 `/api/*` 요청이 포트 3001로 자동 전달됩니다.

3. **프로덕션 번들 확인**
   ```bash
   npm run build
   PORT=3000 node server.js
   ```
   - 단일 서버가 정적 파일과 API를 함께 제공합니다.

---

## 8. 추가 운영 팁

| 주제 | 설명 |
| --- | --- |
| 백업 | S3는 기본적으로 내구성이 높지만, 필요 시 다른 리전으로 복제하거나 버전 관리를 켭니다. |
| 수명 주기 관리 | 일정 기간 후 데이터를 삭제하려면 S3 Lifecycle 규칙을 추가합니다. |
| 모니터링 | CloudWatch Logs로 서버 로그를 전송하거나, S3 업로드 실패에 대해 CloudWatch Alarm을 구성합니다. |
| 보안 | `.env` 파일 권한을 제한하고, 장기적으로는 AWS Secrets Manager 또는 Systems Manager Parameter Store 사용을 검토합니다. |

---

## CRA 기본 스크립트

프로젝트는 Create React App으로 시작됐기 때문에 아래 명령도 그대로 사용할 수 있습니다.

- `npm start`: 개발 서버 실행
- `npm test`: 테스트 실행
- `npm run build`: 프로덕션 번들 생성
- `npm run eject`: 빌드 설정 추출 (되돌릴 수 없음)

공식 문서는 [Create React App 문서](https://github.com/facebook/create-react-app)와 [React 문서](https://reactjs.org/)를 참고하세요.
