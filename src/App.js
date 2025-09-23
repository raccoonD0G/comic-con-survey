// App.js
import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";
import "./App.css";

export default function App() {
    const [page, setPage] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [email, setEmail] = useState("");
    const topImgRef = useRef(null);
    const bottomImgRef = useRef(null);
    const [stackMetrics, setStackMetrics] = useState({
        collapsed: null,
        expanded: null,
    });

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
    const collapsedRatio = 0.5;

    const updateStackMetrics = useCallback(() => {
        const topEl = topImgRef.current;
        const bottomEl = bottomImgRef.current;

        if (!topEl || !bottomEl) {
            return;
        }

        const topHeight = topEl.getBoundingClientRect().height;
        const bottomHeight = bottomEl.getBoundingClientRect().height;

        if (!topHeight || !bottomHeight) {
            return;
        }

        const expandedHeight = topHeight + bottomHeight;
        const collapsedHeight = topHeight + bottomHeight * collapsedRatio;
        setStackMetrics((prev) => {
            if (
                prev.collapsed === collapsedHeight &&
                prev.expanded === expandedHeight
            ) {
                return prev;
            }

            return {
                collapsed: collapsedHeight,
                expanded: expandedHeight,
            };
        });
    }, [collapsedRatio]);

    useEffect(() => {
        updateStackMetrics();

        window.addEventListener("resize", updateStackMetrics);
        return () => window.removeEventListener("resize", updateStackMetrics);
    }, [updateStackMetrics]);

    const hasStackMetrics = stackMetrics.collapsed !== null && stackMetrics.expanded !== null;
    const stackHeight = expanded ? stackMetrics.expanded : stackMetrics.collapsed;
    const stackStyles = hasStackMetrics ? { height: `${stackHeight}px` } : undefined;

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
                        <img
                            className="page1-basic-info"
                            src="/basic_Information_image.png"
                            alt="기본 정보"
                        />
                        <div className="page1-email-area">
                            <img
                                className="page1-email-image"
                                src="/email_text_image.png"
                                alt="이메일 안내"
                            />
                            <label className="page1-email-input">
                                <span className="sr-only">이메일 주소 입력</span>
                                <img src="/emil_text_box.png" alt="" aria-hidden="true" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="이메일을 입력하세요"
                                    autoComplete="email"
                                />
                            </label>
                        </div>
                        <div className="page1-controls">
                            <button
                                className="img-btn before-btn"
                                onClick={() => setPage(0)}
                                aria-label="이전 페이지"
                                title="이전 페이지로 돌아가기"
                            >
                                <img src="/before_button.png" alt="이전" />
                            </button>
                            <button
                                className="img-btn next-btn"
                                onClick={() => setPage(2)}
                                aria-label="다음 페이지"
                                title="다음 페이지로 이동"
                            >
                                <img src="/next_on_button.png" alt="다음" />
                            </button>
                        </div>
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
                        <h1>PAGE 2</h1>
                        <p>콘텐츠가 곧 제공됩니다.</p>
                        <button
                            className="img-btn before-btn"
                            onClick={() => setPage(1)}
                            aria-label="이전 페이지"
                            title="이전 페이지"
                        >
                            <img src="/before.png" alt="이전" />
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
                <div className="page page0">
                    {/* 1) EntryText 스택 */}
                    <div
                        className={`text-stack ${expanded ? "expanded" : "collapsed"}`}
                        style={stackStyles}
                        data-stack-ready={hasStackMetrics ? "true" : "false"}
                    >
                        <div className="stack-inner">
                            <img
                                ref={topImgRef}
                                className="text-img top"
                                src="/entry_text_image0.png"
                                alt="EntryText0"
                                onLoad={updateStackMetrics}
                            />
                            <img
                                ref={bottomImgRef}
                                className="text-img bottom"
                                src="/entry_text_image1.png"
                                alt="EntryText1"
                                onLoad={updateStackMetrics}
                            />
                        </div>
                        <div className="fade-mask" aria-hidden="true" />
                    </div>

                    {/* 2) 화살표 버튼 */}
                    {!expanded && (
                        <button className="arrow-button" onClick={() => setExpanded(true)} aria-label="더 보기">
                            <img src="/arrow_button.png" alt="펼치기" />
                        </button>
                    )}

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
                        <button className="img-btn start-btn" onClick={() => setPage(1)} aria-label="START" title="시작하기">
                            <img src="/start_on_button.png" alt="START" />
                        </button>
                    ) : (
                        <button className="img-btn start-btn" aria-label="START" title="동의가 필요합니다" disabled>
                                <img src="/start_off_button.png" alt="START 비활성" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
