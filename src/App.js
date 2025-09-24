// App.js
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const BASIC_INFO_SOURCES = ["/basic_Information_image.png", "/basic_Information_image.png"];
const BEFORE_BUTTON_SOURCES = ["/before.png", "/before_button.png"];
const NEXT_ON_BUTTON_SOURCES = ["/next_on_button.png", "/next.png"];
const NEXT_OFF_BUTTON_SOURCES = ["/next_off_button.png", "/next.png"];
const NEXT_TEXT_SOURCES = ["/next_text_image.png"];
const EMAIL_IMAGE_SOURCES = ["/email_text_image.png", "/email_text_image.png"];
const EMAIL_TEXT_BOX_SOURCES = ["/email_text_box.png", "/emil_text_box.png"];
const AGE_TEXT_SOURCES = ["/age_text_image.png", "/age_text_image.png"];
const GENDER_TEXT_SOURCES = ["/gender_text_image.png", "/gender_text_image.png"];
const SCROLL_LINE_SOURCES = ["/scroll_line_image.png", "/scroll_line.png"];
const SCROLL_HANDLE_SOURCES = ["/scroll_handle_image.png", "/scroll_handle.png"];
const AGE_TRACK_LEFT_PERCENT = 7.466667;
const AGE_TRACK_WIDTH_PERCENT = 90.4;
const AGE_TRACK_START_OFFSET_PERCENT = (25 / 339) * AGE_TRACK_WIDTH_PERCENT;
const AGE_TRACK_END_OFFSET_PERCENT = (25 / 339) * AGE_TRACK_WIDTH_PERCENT;
const AGE_HANDLE_TOP_PERCENT = 33.251232;
const AGE_STOPS = [
    {
        id: "10s",
        label: "10대",
    },
    {
        id: "20s",
        label: "20대",
    },
    {
        id: "30s",
        label: "30대",
    },
    {
        id: "40s",
        label: "40대",
    },
    {
        id: "50s",
        label: "50대",
    },
    {
        id: "60s",
        label: "60대 이상",
    },
];
const OFF_TOGGLE_SOURCES = ["/off_toggle.png"];
const ON_TOGGLE_SOURCES = ["/on_toggle.png"];
const GENDER_OPTIONS = [
    {
        id: "male",
        label: "남성",
        imageSources: ["/male_image.png"],
        topPercent: 53.817734,
    },
    {
        id: "female",
        label: "여성",
        imageSources: ["/female_image.png"],
        topPercent: 61.206897,
    },
    {
        id: "other",
        label: "기타",
        imageSources: ["/other_image.png"],
        topPercent: 68.596059,
    },
];
const Q1_TITLE_SOURCES = ["/q1_title_image.png"];
const Q1_TEXT_SOURCES = ["/q1_text_image.png"];
const Q1_OPTIONS = [
    {
        id: "absolutelyAmazing",
        label: "Absolutely amazing",
        imageSources: ["/absolutely_amazing_image.png"],
    },
    {
        id: "superFun",
        label: "Super fun",
        imageSources: ["/super_fun_image.png"],
    },
    {
        id: "itWasOkay",
        label: "It was okay",
        imageSources: ["/it_was_okay_image.png"],
    },
    {
        id: "couldBeBetter",
        label: "Could be better",
        imageSources: ["/could_be_better_image.png"],
    },
    {
        id: "notMyThing",
        label: "Not my thing",
        imageSources: ["/not_my_thing_image.png"],
    },
];
const Q1_OPTION_BASE_TOP_PERCENT = (265 / 812) * 100;
const Q1_OPTION_STEP_PERCENT = (82 / 812) * 100;
const Q2_TITLE_SOURCES = ["/q2_title_image.png"];
const Q2_TEXT_SOURCES = ["/q2_text_image.png"];
const Q2_OPTIONS = [
    {
        id: "interactivity",
        label: "The interactivity",
        imageSources: ["/the_interactivity_image.png"],
        top: 268,
        height: 100,
        toggleTop: 30,
        labelTop: 30,
        labelHeight: 84,
    },
    {
        id: "awesomeGraphics",
        label: "The awesome graphics",
        imageSources: ["/the_awesome_graphics_image.png"],
        top: 368,
        height: 76,
        toggleTop: 18,
        labelTop: 0,
        labelHeight: 60,
    },
    {
        id: "funStorytelling",
        label: "The fun storytelling",
        imageSources: ["/the_fun_storytelling_image.png"],
        top: 444,
        height: 76,
        toggleTop: 18,
        labelTop: 0,
        labelHeight: 60,
    },
    {
        id: "koreanBackstreet",
        label: "Korean backstreet",
        imageSources: ["/korean_backstreet_image.png"],
        top: 520,
        height: 76,
        toggleTop: 18,
        labelTop: 0,
        labelHeight: 60,
    },
    {
        id: "other",
        label: "Other",
        imageSources: ["/other_image.png"],
        top: 596,
        height: 76,
        toggleTop: 18,
        labelTop: 0,
        labelHeight: 60,
        allowsCustomInput: true,
    },
];
const Q2_STAGE_HEIGHT = 812;
const Q2_OPTION_WIDTH = 323; // option width in the 375px design
const Q2_TOGGLE_IMAGE_SIZE = 24;
const Q2_LABEL_LEFT_PERCENT = (46 / Q2_OPTION_WIDTH) * 100;
const Q2_LABEL_WIDTH_PERCENT = (277 / Q2_OPTION_WIDTH) * 100;
const Q2_TOGGLE_WIDTH_PERCENT = (Q2_TOGGLE_IMAGE_SIZE / Q2_OPTION_WIDTH) * 100;
const Q3_TITLE_SOURCES = ["/q3_title_image.png"];
const Q3_TEXT_SOURCES = ["/q3_text_image.png"];
const Q3_OPTIONS = [
    {
        id: "fashion",
        label: "Fashion",
        imageSources: ["/Fashion_image.png"],
        top: 264,
        height: 74,
        toggleTop: 30,
        labelTop: 0,
        labelHeight: 60,
    },
    {
        id: "sports",
        label: "Sports",
        imageSources: ["/sports_image.png"],
        top: 338,
        height: 74,
        toggleTop: 30,
        labelTop: 0,
        labelHeight: 60,
    },
    {
        id: "anime",
        label: "Anime",
        imageSources: ["/anime_image.png"],
        top: 412,
        height: 94,
        toggleTop: 30,
        labelTop: 0,
        labelHeight: 80,
    },
    {
        id: "movie",
        label: "Movie",
        imageSources: ["/movie_image.png"],
        top: 506,
        height: 74,
        toggleTop: 30,
        labelTop: 0,
        labelHeight: 60,
    },
    {
        id: "education",
        label: "Education",
        imageSources: ["/education_image.png"],
        top: 580,
        height: 73,
        toggleTop: 30,
        labelTop: 0,
        labelHeight: 73,
    },
];
const Q3_STAGE_HEIGHT = 812;
const Q3_TOGGLE_IMAGE_SIZE = Q2_TOGGLE_IMAGE_SIZE;
const Q3_LABEL_LEFT_PERCENT = Q2_LABEL_LEFT_PERCENT;
const Q3_LABEL_WIDTH_PERCENT = Q2_LABEL_WIDTH_PERCENT;
const Q3_TOGGLE_WIDTH_PERCENT = Q2_TOGGLE_WIDTH_PERCENT;

function ImgWithFallback({ sources = [], alt, ...imgProps }) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setActiveIndex(0);
    }, [sources]);

    const sourceList = sources.length > 0 ? sources : [""];
    const lastIndex = sourceList.length - 1;

    const handleError = useCallback(() => {
        setActiveIndex((previous) => {
            const nextIndex = previous + 1;
            if (nextIndex <= lastIndex) {
                return nextIndex;
            }
            return previous;
        });
    }, [lastIndex]);

    const currentIndex = activeIndex > lastIndex ? lastIndex : activeIndex;
    const canAdvance = currentIndex < lastIndex;
    const currentSrc = sourceList[currentIndex];

    return (
        <img
            src={currentSrc}
            alt={alt}
            onError={canAdvance ? handleError : undefined}
            {...imgProps}
        />
    );
}

export default function App() {
    const [page, setPage] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [email, setEmail] = useState("");
    const [ageIndex, setAgeIndex] = useState(0);
    const [ageInteracted, setAgeInteracted] = useState(false);
    const [gender, setGender] = useState(null);
    const [q1Answer, setQ1Answer] = useState(null);
    const [q2Answer, setQ2Answer] = useState(null);
    const [q2OtherText, setQ2OtherText] = useState("");
    const [q3Answer, setQ3Answer] = useState(null);
    const genderOptionCount = GENDER_OPTIONS.length;
    const genderOptionRefs = useRef([]);
    const q1OptionCount = Q1_OPTIONS.length;
    const q1OptionRefs = useRef([]);
    const q2OptionCount = Q2_OPTIONS.length;
    const q2OptionRefs = useRef([]);
    const q3OptionCount = Q3_OPTIONS.length;
    const q3OptionRefs = useRef([]);
    const q2OtherInputRef = useRef(null);
    const focusGenderOption = useCallback(
        (index) => {
            const target = genderOptionRefs.current[index];
            if (target) {
                target.focus();
            }
        },
        [genderOptionRefs]
    );
    const focusQ1Option = useCallback(
        (index) => {
            const target = q1OptionRefs.current[index];
            if (target) {
                target.focus();
            }
        },
        [q1OptionRefs]
    );
    const focusQ2Option = useCallback(
        (index) => {
            const target = q2OptionRefs.current[index];
            if (target) {
                target.focus();
            }
        },
        [q2OptionRefs]
    );
    const focusQ3Option = useCallback(
        (index) => {
            const target = q3OptionRefs.current[index];
            if (target) {
                target.focus();
            }
        },
        [q3OptionRefs]
    );
    const handleGenderKeyDown = useCallback(
        (event, optionIndex) => {
            if (genderOptionCount <= 0) {
                return;
            }

            if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault();
                const nextIndex = (optionIndex + 1) % genderOptionCount;
                setGender(GENDER_OPTIONS[nextIndex].id);
                focusGenderOption(nextIndex);
            } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                const previousIndex =
                    (optionIndex - 1 + genderOptionCount) % genderOptionCount;
                setGender(GENDER_OPTIONS[previousIndex].id);
                focusGenderOption(previousIndex);
            } else if (event.key === "Home") {
                event.preventDefault();
                setGender(GENDER_OPTIONS[0].id);
                focusGenderOption(0);
            } else if (event.key === "End") {
                event.preventDefault();
                const lastIndex = genderOptionCount - 1;
                setGender(GENDER_OPTIONS[lastIndex].id);
                focusGenderOption(lastIndex);
            }
        },
        [focusGenderOption, genderOptionCount]
    );
    const handleQ1KeyDown = useCallback(
        (event, optionIndex) => {
            if (q1OptionCount <= 0) {
                return;
            }

            if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault();
                const nextIndex = (optionIndex + 1) % q1OptionCount;
                setQ1Answer(Q1_OPTIONS[nextIndex].id);
                focusQ1Option(nextIndex);
            } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                const previousIndex =
                    (optionIndex - 1 + q1OptionCount) % q1OptionCount;
                setQ1Answer(Q1_OPTIONS[previousIndex].id);
                focusQ1Option(previousIndex);
            } else if (event.key === "Home") {
                event.preventDefault();
                setQ1Answer(Q1_OPTIONS[0].id);
                focusQ1Option(0);
            } else if (event.key === "End") {
                event.preventDefault();
                const lastIndex = q1OptionCount - 1;
                setQ1Answer(Q1_OPTIONS[lastIndex].id);
                focusQ1Option(lastIndex);
            }
        },
        [focusQ1Option, q1OptionCount]
    );
    const handleSelectQ2Option = useCallback((optionId, focusInput = false) => {
        setQ2Answer(optionId);
        if (optionId === "other" && focusInput) {
            setTimeout(() => {
                const input = q2OtherInputRef.current;
                if (input) {
                    input.focus();
                    input.select();
                }
            }, 0);
        }
    }, []);
    const handleQ2KeyDown = useCallback(
        (event, optionIndex) => {
            if (q2OptionCount <= 0) {
                return;
            }

            if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault();
                const nextIndex = (optionIndex + 1) % q2OptionCount;
                handleSelectQ2Option(Q2_OPTIONS[nextIndex].id);
                focusQ2Option(nextIndex);
            } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                const previousIndex =
                    (optionIndex - 1 + q2OptionCount) % q2OptionCount;
                handleSelectQ2Option(Q2_OPTIONS[previousIndex].id);
                focusQ2Option(previousIndex);
            } else if (event.key === "Home") {
                event.preventDefault();
                handleSelectQ2Option(Q2_OPTIONS[0].id);
                focusQ2Option(0);
            } else if (event.key === "End") {
                event.preventDefault();
                const lastIndex = q2OptionCount - 1;
                handleSelectQ2Option(Q2_OPTIONS[lastIndex].id);
                focusQ2Option(lastIndex);
            }
        },
        [focusQ2Option, handleSelectQ2Option, q2OptionCount]
    );
    const handleQ3KeyDown = useCallback(
        (event, optionIndex) => {
            if (q3OptionCount <= 0) {
                return;
            }

            if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault();
                const nextIndex = (optionIndex + 1) % q3OptionCount;
                setQ3Answer(Q3_OPTIONS[nextIndex].id);
                focusQ3Option(nextIndex);
            } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                const previousIndex =
                    (optionIndex - 1 + q3OptionCount) % q3OptionCount;
                setQ3Answer(Q3_OPTIONS[previousIndex].id);
                focusQ3Option(previousIndex);
            } else if (event.key === "Home") {
                event.preventDefault();
                setQ3Answer(Q3_OPTIONS[0].id);
                focusQ3Option(0);
            } else if (event.key === "End") {
                event.preventDefault();
                const lastIndex = q3OptionCount - 1;
                setQ3Answer(Q3_OPTIONS[lastIndex].id);
                focusQ3Option(lastIndex);
            }
        },
        [focusQ3Option, q3OptionCount]
    );
    const ageStopCount = AGE_STOPS.length;
    const canAdvanceFromPage1 = email.trim().length > 0;
    const canAdvanceFromPage2 = ageInteracted && gender !== null;
    const canAdvanceFromPage3 = q1Answer !== null;
    const canAdvanceFromPage4 = q2Answer !== null;
    const canAdvanceFromPage5 = q3Answer !== null;
    const handleAgeChange = useCallback((event) => {
        setAgeIndex(Number(event.target.value));
        setAgeInteracted(true);
    }, []);
    const markAgeInteracted = useCallback(() => {
        setAgeInteracted(true);
    }, []);
    useEffect(() => {
        genderOptionRefs.current = genderOptionRefs.current.slice(0, genderOptionCount);
    }, [genderOptionCount]);
    useEffect(() => {
        q1OptionRefs.current = q1OptionRefs.current.slice(0, q1OptionCount);
    }, [q1OptionCount]);
    useEffect(() => {
        q2OptionRefs.current = q2OptionRefs.current.slice(0, q2OptionCount);
    }, [q2OptionCount]);
    useEffect(() => {
        q3OptionRefs.current = q3OptionRefs.current.slice(0, q3OptionCount);
    }, [q3OptionCount]);
    const selectedAgeStop = AGE_STOPS[ageIndex] ?? null;
    const ageHandlePosition = useMemo(() => {
        if (ageStopCount <= 1) {
            return `calc(${AGE_TRACK_LEFT_PERCENT}% + ${AGE_TRACK_START_OFFSET_PERCENT}%)`;
        }

        const effectiveTrackPercent =
            AGE_TRACK_WIDTH_PERCENT -
            AGE_TRACK_START_OFFSET_PERCENT -
            AGE_TRACK_END_OFFSET_PERCENT;
        const offsetPercent =
            AGE_TRACK_START_OFFSET_PERCENT +
            (ageIndex / (ageStopCount - 1)) * effectiveTrackPercent;
        return `calc(${AGE_TRACK_LEFT_PERCENT}% + ${offsetPercent}%)`;
    }, [ageIndex, ageStopCount]);
    const ageValueText = selectedAgeStop ? `${selectedAgeStop.label}` : undefined;
    const genderValueText = gender
        ? GENDER_OPTIONS.find((option) => option.id === gender)?.label
        : undefined;

    // public/ 경로
    const bg0 = useMemo(() => process.env.PUBLIC_URL + "/background0.png", []);
    const bg1 = useMemo(() => process.env.PUBLIC_URL + "/background1.png", []); // 페이지1 배경
    const bg2 = useMemo(() => process.env.PUBLIC_URL + "/background2.png", []);
    const bg3 = useMemo(() => process.env.PUBLIC_URL + "/background3.png", []);
    const bg4 = useMemo(() => process.env.PUBLIC_URL + "/background4.png", []);

    // 배경 프리로드(전환 시 깜빡임 방지)
    useEffect(() => {
        [bg0, bg1, bg2, bg3, bg4].forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, [bg0, bg1, bg2, bg3, bg4]);

    const bgUrl = useMemo(() => {
        if (page === 0) {
            return bg0;
        }
        if (page === 4) {
            return bg2;
        }
        if (page === 5) {
            return bg3;
        }
        return bg1;
    }, [bg0, bg1, bg2, bg3, bg4, page]);
    const page0StateClass = expanded ? "is-expanded" : "is-collapsed";

    // ----- PAGE 1 (임시) -----
    if (page === 1) {
        return (
            <div className="app-root">
                <div
                    className="phone-stage"
                    style={{
                        backgroundImage: `url(${bgUrl})`,
                    }}
                >
                    <div className="page page1">
                        <ImgWithFallback
                            className="page1-basic-info"
                            sources={BASIC_INFO_SOURCES}
                            alt="기본 정보"
                        />
                        <ImgWithFallback
                            className="page1-email-image"
                            sources={EMAIL_IMAGE_SOURCES}
                            alt="이메일 안내"
                        />
                        <label className="page1-email-input">
                            <span className="sr-only">이메일 주소 입력</span>
                            <ImgWithFallback
                                className="page1-email-input-bg"
                                sources={EMAIL_TEXT_BOX_SOURCES}
                                alt=""
                                aria-hidden="true"
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="이메일을 입력하세요"
                                autoComplete="email"
                            />
                        </label>
                        <button
                            className="img-btn page1-before-btn"
                            type="button"
                            onClick={() => setPage(0)}
                            aria-label="이전 페이지"
                            title="이전 페이지로 돌아가기"
                        >
                            <ImgWithFallback
                                className="page1-before-btn-img"
                                sources={BEFORE_BUTTON_SOURCES}
                                alt="이전"
                            />
                        </button>
                        <button
                            className="img-btn page1-next-btn"
                            type="button"
                            onClick={() => setPage(2)}
                            aria-label="다음 페이지"
                            title={
                                canAdvanceFromPage1
                                    ? "다음 페이지로 이동"
                                    : "이메일을 입력하면 다음 페이지로 이동할 수 있습니다"
                            }
                            disabled={!canAdvanceFromPage1}
                        >
                            <ImgWithFallback
                                className="page1-next-btn-img"
                                sources={
                                    canAdvanceFromPage1
                                        ? NEXT_ON_BUTTON_SOURCES
                                        : NEXT_OFF_BUTTON_SOURCES
                                }
                                alt="다음"
                            />
                            <ImgWithFallback
                                className="page1-next-text"
                                sources={NEXT_TEXT_SOURCES}
                                alt=""
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (page === 2) {
        return (
            <div className="app-root">
                <div
                    className="phone-stage"
                    style={{
                        backgroundImage: `url(${bgUrl})`,
                    }}
                >
                    <div className="page page2">
                        <ImgWithFallback
                            className="page2-basic-info"
                            sources={BASIC_INFO_SOURCES}
                            alt="기본 정보"
                        />
                        <ImgWithFallback
                            className="page2-age-title"
                            sources={AGE_TEXT_SOURCES}
                            alt="연령대 질문"
                        />
                        <ImgWithFallback
                            className="page2-age-line"
                            sources={SCROLL_LINE_SOURCES}
                            alt=""
                            aria-hidden="true"
                        />
                        <ImgWithFallback
                            className={`page2-age-handle${ageInteracted ? "" : " is-idle"}`}
                            sources={SCROLL_HANDLE_SOURCES}
                            alt=""
                            aria-hidden="true"
                            style={{ left: ageHandlePosition, top: `${AGE_HANDLE_TOP_PERCENT}%` }}
                        />
                        <input
                            className="page2-age-range"
                            type="range"
                            min="0"
                            max={ageStopCount - 1}
                            step="1"
                            value={ageIndex}
                            onChange={handleAgeChange}
                            onPointerDown={markAgeInteracted}
                            onKeyDown={markAgeInteracted}
                            aria-label="연령대 선택"
                            aria-valuemin={0}
                            aria-valuemax={ageStopCount - 1}
                            aria-valuenow={ageIndex}
                            aria-valuetext={ageValueText}
                        />
                        <div className="sr-only" aria-live="polite">
                            {ageInteracted && selectedAgeStop
                                ? `선택된 연령대: ${selectedAgeStop.label}`
                                : "연령대를 선택하세요"}
                        </div>
                        <ImgWithFallback
                            className="page2-gender-title"
                            sources={GENDER_TEXT_SOURCES}
                            alt="성별 질문"
                        />
                        <div
                            className="page2-gender-group"
                            role="radiogroup"
                            aria-label="성별 선택"
                            aria-required="true"
                        >
                            {GENDER_OPTIONS.map((option, index) => {
                                const isSelected = gender === option.id;
                                const toggleSources = isSelected
                                    ? ON_TOGGLE_SOURCES
                                    : OFF_TOGGLE_SOURCES;
                                const isTabStop =
                                    gender === null ? index === 0 : isSelected;

                                return (
                                    <button
                                        key={option.id}
                                        type="button"
                                        className="page2-gender-option"
                                        style={{ top: `${option.topPercent}%` }}
                                        onClick={() => setGender(option.id)}
                                        onKeyDown={(event) =>
                                            handleGenderKeyDown(event, index)
                                        }
                                        role="radio"
                                        aria-checked={isSelected}
                                        tabIndex={isTabStop ? 0 : -1}
                                        ref={(element) => {
                                            genderOptionRefs.current[index] = element;
                                        }}
                                    >
                                        <span className="sr-only">{option.label}</span>
                                        <ImgWithFallback
                                            className="page2-gender-toggle"
                                            sources={toggleSources}
                                            alt=""
                                            aria-hidden="true"
                                        />
                                        <ImgWithFallback
                                            className="page2-gender-label"
                                            sources={option.imageSources}
                                            alt=""
                                            aria-hidden="true"
                                        />
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            className="img-btn page2-before-btn"
                            type="button"
                            onClick={() => setPage(1)}
                            aria-label="이전 페이지"
                            title="이전 페이지로 돌아가기"
                        >
                            <ImgWithFallback
                                className="page2-before-btn-img"
                                sources={BEFORE_BUTTON_SOURCES}
                                alt="이전"
                            />
                        </button>
                        <button
                            className="img-btn page2-next-btn"
                            type="button"
                            onClick={() => {
                                if (canAdvanceFromPage2) {
                                    setPage(3);
                                }
                            }}
                            aria-label="다음 페이지"
                            title={
                                canAdvanceFromPage2
                                    ? "다음 페이지로 이동"
                                    : "연령대와 성별을 선택하면 다음으로 이동할 수 있습니다"
                            }
                            disabled={!canAdvanceFromPage2}
                        >
                            <ImgWithFallback
                                className="page2-next-btn-img"
                                sources={
                                    canAdvanceFromPage2
                                        ? NEXT_ON_BUTTON_SOURCES
                                        : NEXT_OFF_BUTTON_SOURCES
                                }
                                alt="다음"
                            />
                            <ImgWithFallback
                                className="page2-next-text"
                                sources={NEXT_TEXT_SOURCES}
                                alt=""
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (page === 3) {
        return (
            <div className="app-root">
                <div
                    className="phone-stage"
                    style={{
                        backgroundImage: `url(${bgUrl})`,
                    }}
                >
                    <div className="page page3">
                        <ImgWithFallback
                            className="page3-q1-title"
                            sources={Q1_TITLE_SOURCES}
                            alt="질문 1 제목"
                        />
                        <ImgWithFallback
                            className="page3-q1-text"
                            sources={Q1_TEXT_SOURCES}
                            alt="질문 1 안내"
                        />
                        <div
                            className="page3-q1-options"
                            role="radiogroup"
                            aria-label="행사 만족도 선택"
                        >
                            {Q1_OPTIONS.map((option, index) => {
                                const isSelected = q1Answer === option.id;
                                const toggleSources = isSelected
                                    ? ON_TOGGLE_SOURCES
                                    : OFF_TOGGLE_SOURCES;
                                const isTabStop =
                                    q1Answer === null ? index === 0 : isSelected;
                                const topPercent =
                                    Q1_OPTION_BASE_TOP_PERCENT +
                                    Q1_OPTION_STEP_PERCENT * index;

                                return (
                                    <button
                                        key={option.id}
                                        type="button"
                                        className="page3-q1-option"
                                        style={{ top: `${topPercent}%` }}
                                        onClick={() => setQ1Answer(option.id)}
                                        onKeyDown={(event) =>
                                            handleQ1KeyDown(event, index)
                                        }
                                        role="radio"
                                        aria-checked={isSelected}
                                        tabIndex={isTabStop ? 0 : -1}
                                        ref={(element) => {
                                            q1OptionRefs.current[index] = element;
                                        }}
                                    >
                                        <span className="sr-only">{option.label}</span>
                                        <ImgWithFallback
                                            className="page3-q1-toggle"
                                            sources={toggleSources}
                                            alt=""
                                            aria-hidden="true"
                                        />
                                        <ImgWithFallback
                                            className="page3-q1-label"
                                            sources={option.imageSources}
                                            alt=""
                                            aria-hidden="true"
                                        />
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            className="img-btn page3-before-btn"
                            type="button"
                            onClick={() => setPage(2)}
                            aria-label="이전 페이지"
                            title="이전 페이지로 돌아가기"
                        >
                            <ImgWithFallback
                                className="page3-before-btn-img"
                                sources={BEFORE_BUTTON_SOURCES}
                                alt="이전"
                            />
                        </button>
                        <button
                            className="img-btn page3-next-btn"
                            type="button"
                            onClick={() => {
                                if (canAdvanceFromPage3) {
                                    setPage(4);
                                }
                            }}
                            aria-label="다음 페이지"
                            title={
                                canAdvanceFromPage3
                                    ? "다음 페이지로 이동"
                                    : "만족도를 선택하면 다음으로 이동할 수 있습니다"
                            }
                            disabled={!canAdvanceFromPage3}
                        >
                            <ImgWithFallback
                                className="page3-next-btn-img"
                                sources={
                                    canAdvanceFromPage3
                                        ? NEXT_ON_BUTTON_SOURCES
                                        : NEXT_OFF_BUTTON_SOURCES
                                }
                                alt="다음"
                            />
                            <ImgWithFallback
                                className="page3-next-text"
                                sources={NEXT_TEXT_SOURCES}
                                alt=""
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (page === 4) {
        return (
            <div className="app-root">
                <div
                    className="phone-stage"
                    style={{
                        backgroundImage: `url(${bgUrl})`,
                    }}
                >
                    <div className="page page4">
                        <ImgWithFallback
                            className="page4-q2-title"
                            sources={Q2_TITLE_SOURCES}
                            alt="질문 2 제목"
                        />
                        <ImgWithFallback
                            className="page4-q2-text"
                            sources={Q2_TEXT_SOURCES}
                            alt="질문 2 안내"
                        />
                        <div
                            className="page4-q2-options"
                            role="radiogroup"
                            aria-label="행사에서 가장 좋았던 점 선택"
                        >
                            {Q2_OPTIONS.map((option, index) => {
                                const isSelected = q2Answer === option.id;
                                const toggleSources = isSelected
                                    ? ON_TOGGLE_SOURCES
                                    : OFF_TOGGLE_SOURCES;
                                const isTabStop =
                                    q2Answer === null ? index === 0 : isSelected;
                                const topPercent = (option.top / Q2_STAGE_HEIGHT) * 100;
                                const heightPercent =
                                    (option.height / Q2_STAGE_HEIGHT) * 100;
                                const toggleTopPercent =
                                    (option.toggleTop / option.height) * 100;
                                const toggleHeightPercent =
                                    (Q2_TOGGLE_IMAGE_SIZE / option.height) * 100;
                                const labelTopPercent =
                                    (option.labelTop / option.height) * 100;
                                const labelHeightPercent =
                                    (option.labelHeight / option.height) * 100;

                                return (
                                    <div
                                        key={option.id}
                                        className="page4-q2-option-wrapper"
                                        style={{
                                            top: `${topPercent}%`,
                                            height: `${heightPercent}%`,
                                        }}
                                    >
                                        <button
                                            type="button"
                                            className="page4-q2-option-button"
                                            onClick={() =>
                                                handleSelectQ2Option(
                                                    option.id,
                                                    option.allowsCustomInput ?? false
                                                )
                                            }
                                            onKeyDown={(event) =>
                                                handleQ2KeyDown(event, index)
                                            }
                                            role="radio"
                                            aria-checked={isSelected}
                                            tabIndex={isTabStop ? 0 : -1}
                                            ref={(element) => {
                                                q2OptionRefs.current[index] = element;
                                            }}
                                        >
                                            <span className="sr-only">{option.label}</span>
                                            <ImgWithFallback
                                                className="page4-q2-toggle"
                                                sources={toggleSources}
                                                alt=""
                                                aria-hidden="true"
                                                style={{
                                                    top: `${toggleTopPercent}%`,
                                                    height: `${toggleHeightPercent}%`,
                                                    width: `${Q2_TOGGLE_WIDTH_PERCENT}%`,
                                                }}
                                            />
                                            <ImgWithFallback
                                                className="page4-q2-label"
                                                sources={option.imageSources}
                                                alt=""
                                                aria-hidden="true"
                                                style={{
                                                    top: `${labelTopPercent}%`,
                                                    height: `${labelHeightPercent}%`,
                                                    left: `${Q2_LABEL_LEFT_PERCENT}%`,
                                                    width: `${Q2_LABEL_WIDTH_PERCENT}%`,
                                                }}
                                            />
                                        </button>
                                        {option.allowsCustomInput && isSelected ? (
                                            <input
                                                ref={q2OtherInputRef}
                                                className="page4-q2-other-input"
                                                type="text"
                                                value={q2OtherText}
                                                onChange={(event) =>
                                                    setQ2OtherText(event.target.value)
                                                }
                                                placeholder="직접 입력"
                                                aria-label="기타 의견 입력"
                                                style={{
                                                    top: `${labelTopPercent}%`,
                                                    height: `${labelHeightPercent}%`,
                                                    left: `${Q2_LABEL_LEFT_PERCENT}%`,
                                                    width: `${Q2_LABEL_WIDTH_PERCENT}%`,
                                                }}
                                            />
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                        <button
                            className="img-btn page4-before-btn"
                            type="button"
                            onClick={() => setPage(3)}
                            aria-label="이전 페이지"
                            title="이전 페이지로 돌아가기"
                        >
                            <ImgWithFallback
                                className="page4-before-btn-img"
                                sources={BEFORE_BUTTON_SOURCES}
                                alt="이전"
                            />
                        </button>
                        <button
                            className="img-btn page4-next-btn"
                            type="button"
                            onClick={() => {
                                if (canAdvanceFromPage4) {
                                    setPage(5);
                                }
                            }}
                            aria-label="다음 페이지"
                            title={
                                canAdvanceFromPage4
                                    ? "다음 페이지로 이동"
                                    : "선택지를 고르면 다음으로 이동할 수 있습니다"
                            }
                            disabled={!canAdvanceFromPage4}
                        >
                            <ImgWithFallback
                                className="page4-next-btn-img"
                                sources={
                                    canAdvanceFromPage4
                                        ? NEXT_ON_BUTTON_SOURCES
                                        : NEXT_OFF_BUTTON_SOURCES
                                }
                                alt="다음"
                            />
                            <ImgWithFallback
                                className="page4-next-text"
                                sources={NEXT_TEXT_SOURCES}
                                alt=""
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (page === 5) {
        return (
            <div className="app-root">
                <div
                    className="phone-stage"
                    style={{
                        backgroundImage: `url(${bgUrl})`,
                    }}
                >
                    <div className="page page5">
                        <ImgWithFallback
                            className="page5-q3-title"
                            sources={Q3_TITLE_SOURCES}
                            alt="질문 3 제목"
                        />
                        <ImgWithFallback
                            className="page5-q3-text"
                            sources={Q3_TEXT_SOURCES}
                            alt="질문 3 안내"
                        />
                        <div
                            className="page5-q3-options"
                            role="radiogroup"
                            aria-label="관심 있는 카테고리 선택"
                        >
                            {Q3_OPTIONS.map((option, index) => {
                                const isSelected = q3Answer === option.id;
                                const toggleSources = isSelected
                                    ? ON_TOGGLE_SOURCES
                                    : OFF_TOGGLE_SOURCES;
                                const isTabStop =
                                    q3Answer === null ? index === 0 : isSelected;
                                const topPercent =
                                    (option.top / Q3_STAGE_HEIGHT) * 100;
                                const heightPercent =
                                    (option.height / Q3_STAGE_HEIGHT) * 100;
                                const toggleTopPercent =
                                    (option.toggleTop / option.height) * 100;
                                const toggleHeightPercent =
                                    (Q3_TOGGLE_IMAGE_SIZE / option.height) * 100;
                                const labelTopPercent =
                                    (option.labelTop / option.height) * 100;
                                const labelHeightPercent =
                                    (option.labelHeight / option.height) * 100;

                                return (
                                    <div
                                        key={option.id}
                                        className="page5-q3-option-wrapper"
                                        style={{
                                            top: `${topPercent}%`,
                                            height: `${heightPercent}%`,
                                        }}
                                    >
                                        <button
                                            type="button"
                                            className="page5-q3-option-button"
                                            onClick={() => setQ3Answer(option.id)}
                                            onKeyDown={(event) =>
                                                handleQ3KeyDown(event, index)
                                            }
                                            role="radio"
                                            aria-checked={isSelected}
                                            tabIndex={isTabStop ? 0 : -1}
                                            ref={(element) => {
                                                q3OptionRefs.current[index] = element;
                                            }}
                                        >
                                            <span className="sr-only">{option.label}</span>
                                            <ImgWithFallback
                                                className="page5-q3-toggle"
                                                sources={toggleSources}
                                                alt=""
                                                aria-hidden="true"
                                                style={{
                                                    top: `${toggleTopPercent}%`,
                                                    height: `${toggleHeightPercent}%`,
                                                    width: `${Q3_TOGGLE_WIDTH_PERCENT}%`,
                                                }}
                                            />
                                            <ImgWithFallback
                                                className="page5-q3-label"
                                                sources={option.imageSources}
                                                alt=""
                                                aria-hidden="true"
                                                style={{
                                                    top: `${labelTopPercent}%`,
                                                    height: `${labelHeightPercent}%`,
                                                    left: `${Q3_LABEL_LEFT_PERCENT}%`,
                                                    width: `${Q3_LABEL_WIDTH_PERCENT}%`,
                                                }}
                                            />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                        <button
                            className="img-btn page5-before-btn"
                            type="button"
                            onClick={() => setPage(4)}
                            aria-label="이전 페이지"
                            title="이전 페이지로 돌아가기"
                        >
                            <ImgWithFallback
                                className="page5-before-btn-img"
                                sources={BEFORE_BUTTON_SOURCES}
                                alt="이전"
                            />
                        </button>
                        <button
                            className="img-btn page5-next-btn"
                            type="button"
                            onClick={() => {
                                if (canAdvanceFromPage5) {
                                    // 다음 단계는 이후 작업에서 구현 예정
                                }
                            }}
                            aria-label="다음 페이지"
                            title={
                                canAdvanceFromPage5
                                    ? "다음 페이지로 이동"
                                    : "선택지를 고르면 다음으로 이동할 수 있습니다"
                            }
                            disabled={!canAdvanceFromPage5}
                        >
                            <ImgWithFallback
                                className="page5-next-btn-img"
                                sources={
                                    canAdvanceFromPage5
                                        ? NEXT_ON_BUTTON_SOURCES
                                        : NEXT_OFF_BUTTON_SOURCES
                                }
                                alt="다음"
                            />
                            <ImgWithFallback
                                className="page5-next-text"
                                sources={NEXT_TEXT_SOURCES}
                                alt=""
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ----- PAGE 0 -----
    return (
        <div className="app-root">
            <div
                className="phone-stage"
                style={{
                    backgroundImage: `url(${bgUrl})`,
                }}
            >
                <div className={`page page0 ${page0StateClass}`}>
                    {/* 1) EntryText 이미지 */}
                    <img
                        className="page0-entry-img page0-entry-img-top"
                        src="/entry_text_image0.png"
                        alt="EntryText0"
                    />
                    <img
                        className="page0-entry-img page0-entry-img-bottom"
                        src="/entry_text_image1.png"
                        alt="EntryText1"
                    />
                    <div className="page0-entry-fade" aria-hidden="true" />

                    {/* 2) 화살표 버튼 */}
                    <button
                        className={`arrow-button${expanded ? " is-hidden" : ""}`}
                        type="button"
                        onClick={() => {
                            if (!expanded) {
                                setExpanded(true);
                            }
                        }}
                        aria-label="더 보기"
                        title="더 많은 정보 보기"
                        disabled={expanded}
                        aria-hidden={expanded}
                    >
                        <img src="/arrow_button.png" alt="펼치기" />
                    </button>

                    {/* 3) I AGREE 버튼 */}
                    <button
                        className="img-btn agree-btn"
                        onClick={() => setAgreed(true)}
                        disabled={agreed}
                        aria-label="I AGREE"
                        title={agreed ? "동의됨" : "동의하기"}
                    >
                        <img src={agreed ? "/i_agree_on_button.png" : "/i_agree_off_button.png"} alt="I AGREE" />
                    </button>

                    {/* 4) START 버튼 */}
                    {agreed ? (
                        <button
                            className="img-btn start-btn"
                            onClick={() => setPage(1)}
                            aria-label="START"
                            title="시작하기"
                        >
                            <img src="/start_on_button.png" alt="START" />
                        </button>
                    ) : (
                        <button
                            className="img-btn start-btn"
                            aria-label="START"
                            title="동의가 필요합니다"
                            disabled
                        >
                            <img src="/start_off_button.png" alt="START 비활성" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
