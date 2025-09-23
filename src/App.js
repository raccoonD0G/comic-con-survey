// App.js
import React, { useCallback, useEffect, useMemo, useState, useRef } from "react";
import "./App.css";

export default function App() {
    const [page, setPage] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const topImgRef = useRef(null);
    const bottomImgRef = useRef(null);
    const [stackMetrics, setStackMetrics] = useState({
        collapsed: null,
        expanded: null,
        offset: 0,
    });

    // public/ 경로
    const bg0 = useMemo(() => process.env.PUBLIC_URL + "/bg.png", []);
    const bg1 = useMemo(() => process.env.PUBLIC_URL + "/bg_page1.png", []); // 페이지1 배경

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
        const offset = collapsedHeight - expandedHeight;

        setStackMetrics((prev) => {
            if (
                prev.collapsed === collapsedHeight &&
                prev.expanded === expandedHeight &&
                prev.offset === offset
            ) {
                return prev;
            }

            return {
                collapsed: collapsedHeight,
                expanded: expandedHeight,
                offset,
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
    const stackShift = expanded ? stackMetrics.offset : 0;
    const stackStyles = hasStackMetrics ? { height: `${stackHeight}px` } : undefined;
    const stackInnerStyles = hasStackMetrics ? { transform: `translateY(${stackShift}px)` } : undefined;

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
                        <h1>PAGE 1</h1>
                        <p>여기에 다음 페이지 내용을 채우면 됩니다.</p>
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
                        <div className="stack-inner" style={stackInnerStyles}>
                            <img
                                ref={topImgRef}
                                className="text-img top"
                                src="/EntryText0.png"
                                alt="EntryText0"
                                onLoad={updateStackMetrics}
                            />
                            <img
                                ref={bottomImgRef}
                                className="text-img bottom"
                                src="/EntryText1.png"
                                alt="EntryText1"
                                onLoad={updateStackMetrics}
                            />
                        </div>
                        <div className="fade-mask" aria-hidden="true" />
                    </div>

                    {/* 2) 화살표 버튼 */}
                    {!expanded && (
                        <button className="arrow-button" onClick={() => setExpanded(true)} aria-label="더 보기">
                            <img src="/Arrow.png" alt="펼치기" />
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
                        <img src={agreed ? "/I_AGREE_on.png" : "/I_AGREE_off.png"} alt="I AGREE" />
                    </button>

                    {/* 4) START 버튼 */}
                    {agreed ? (
                        <button className="img-btn start-btn" onClick={() => setPage(1)} aria-label="START" title="시작하기">
                            <img src="/START_on.png" alt="START" />
                        </button>
                    ) : (
                        <button className="img-btn start-btn" aria-label="START" title="동의가 필요합니다" disabled>
                            <img src="/START_off.png" alt="START 비활성" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
