// App.js
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";

const BASIC_INFO_SOURCES = ["/basic_Information_image.png", "/basic_Information_image.png"];
const BEFORE_BUTTON_SOURCES = ["/before.png", "/before_button.png"];
const NEXT_ON_BUTTON_SOURCES = ["/next_on_button.png", "/next.png"];
const NEXT_OFF_BUTTON_SOURCES = ["/next_off_button.png", "/next.png"];
const NEXT_TEXT_SOURCES = ["/next_text_image.png"];
const EMAIL_IMAGE_SOURCES = ["/email_text_image.png", "/email_text_image.png"];
const EMAIL_TEXT_BOX_SOURCES = ["/email_text_box.png", "/emil_text_box.png"];
const AGE_TEXT_SOURCES = ["/age_text_image.png", "/age_text_image.png"];
const SCROLL_LINE_SOURCES = ["/scroll_line_image.png", "/scroll_line.png"];
const SCROLL_HANDLE_SOURCES = ["/scroll_handle_image.png", "/scroll_handle.png"];
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
const GENDER_OPTIONS = [
    {
        id: "male",
        label: "남성",
        imageSources: ["/male_image.png"],
    },
    {
        id: "female",
        label: "여성",
        imageSources: ["/female_image.png"],
    },
    {
        id: "other",
        label: "기타",
        imageSources: ["/other_image.png"],
    },
];
const GENDER_TEXT_SOURCES = ["/gender_text_image.png"];

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
    const ageStopCount = AGE_STOPS.length;
    const canAdvanceFromPage1 = email.trim().length > 0;
    const canAdvanceFromPage2 = ageInteracted && gender !== null;
    const handleAgeChange = useCallback((event) => {
        setAgeIndex(Number(event.target.value));
        setAgeInteracted(true);
    }, []);
    const markAgeInteracted = useCallback(() => {
        setAgeInteracted(true);
    }, []);
    const handleGenderSelect = useCallback((value) => {
        setGender(value);
    }, []);
    const selectedAgeStop = AGE_STOPS[ageIndex] ?? null;
    const ageHandlePosition = useMemo(() => {
        if (ageStopCount <= 1) {
            return "0%";
        }

        return `${(ageIndex / (ageStopCount - 1)) * 100}%`;
    }, [ageIndex, ageStopCount]);
    const ageValueText = selectedAgeStop ? `${selectedAgeStop.label}` : undefined;
    const genderValueText = gender
        ? GENDER_OPTIONS.find((option) => option.id === gender)?.label
        : undefined;

    // public/ 경로
    const bg0 = useMemo(() => process.env.PUBLIC_URL + "/background0.png", []);
    const bg1 = useMemo(() => process.env.PUBLIC_URL + "/background1.png", []); // 페이지1 배경

    // 배경 프리로드(전환 시 깜빡임 방지)
    useEffect(() => {
        [bg0, bg1].forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, [bg0, bg1]);

    const bgUrl = page === 0 ? bg0 : bg1;
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
                        <div className="page2-age-title">
                            <ImgWithFallback
                                sources={AGE_TEXT_SOURCES}
                                alt="연령대 질문"
                            />
                        </div>
                        <div className="page2-age-slider">
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
                                style={{ left: ageHandlePosition }}
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
                            <div className="page2-age-value" aria-live="polite">
                                {ageValueText}
                            </div>
                        </div>
                        <div className="page2-gender-title">
                            <ImgWithFallback
                                sources={GENDER_TEXT_SOURCES}
                                alt="성별 질문"
                            />
                        </div>
                        {GENDER_OPTIONS.map((option) => {
                            const isSelected = gender === option.id;
                            return (
                                <div
                                    key={option.id}
                                    className={`page2-gender-option page2-gender-option-${option.id}`}
                                >
                                    <button
                                        type="button"
                                        className="page2-gender-toggle-btn"
                                        onClick={() => handleGenderSelect(option.id)}
                                        aria-pressed={isSelected}
                                        aria-label={`${option.label} 선택`}
                                        title={
                                            isSelected
                                                ? `${option.label} 선택됨`
                                                : `${option.label} 선택`
                                        }
                                    >
                                        <img
                                            src={isSelected ? "/on_toggle.png" : "/off_toggle.png"}
                                            alt=""
                                            aria-hidden="true"
                                        />
                                    </button>
                                    <ImgWithFallback
                                        className="page2-gender-option-label"
                                        sources={option.imageSources}
                                        alt={option.label}
                                    />
                                </div>
                            );
                        })}
                        <div className="sr-only" aria-live="polite">
                            {genderValueText ? `${genderValueText} 선택됨` : "성별을 선택하세요"}
                        </div>
                        <div className="page-nav">
                            <button
                                className="img-btn before-btn"
                                type="button"
                                onClick={() => setPage(1)}
                                aria-label="이전 페이지"
                                title="이전 페이지로 돌아가기"
                            >
                                <ImgWithFallback sources={BEFORE_BUTTON_SOURCES} alt="이전" />
                            </button>
                            <button
                                className="img-btn next-btn"
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
                                    sources={
                                        canAdvanceFromPage2
                                            ? NEXT_ON_BUTTON_SOURCES
                                            : NEXT_OFF_BUTTON_SOURCES
                                    }
                                    alt="다음"
                                />
                            </button>
                        </div>
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
                        <h1>PAGE 3</h1>
                        <p>다음 단계가 준비 중입니다.</p>
                        <div className="page-nav">
                            <button
                                className="img-btn before-btn"
                                type="button"
                                onClick={() => setPage(2)}
                                aria-label="이전 페이지"
                                title="이전 페이지로 돌아가기"
                            >
                                <ImgWithFallback sources={BEFORE_BUTTON_SOURCES} alt="이전" />
                            </button>
                        </div>
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
