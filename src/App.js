// App.js
import React, { useEffect, useMemo, useState } from "react";
import "./App.css";

export default function App() {
    const [page, setPage] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [agreed, setAgreed] = useState(false);

    // public/ ���
    const bg0 = useMemo(() => process.env.PUBLIC_URL + "/bg.png", []);
    const bg1 = useMemo(() => process.env.PUBLIC_URL + "/bg_page1.png", []); // ������1 ���

    // ��� �����ε�(��ȯ �� ������ ����)
    useEffect(() => {
        [bg0, bg1].forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, [bg0, bg1]);

    const bgUrl = page === 0 ? bg0 : bg1;

    // ----- PAGE 1 (�ӽ�) -----
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
                        <p>���⿡ ���� ������ ������ ä��� �˴ϴ�.</p>
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
                    {/* 1) EntryText ���� */}
                    <div className={`text-stack ${expanded ? "expanded" : "collapsed"}`}>
                        <div className="stack-inner">
                            <img className="text-img top" src="/EntryText0.png" alt="EntryText0" />
                            <img className="text-img bottom" src="/EntryText1.png" alt="EntryText1" />
                        </div>
                        {!expanded && <div className="fade-mask" aria-hidden="true" />}
                    </div>

                    {/* 2) ȭ��ǥ ��ư */}
                    {!expanded && (
                        <button className="arrow-button" onClick={() => setExpanded(true)} aria-label="�� ����">
                            <img src="/Arrow.png" alt="��ġ��" />
                        </button>
                    )}

                    {/* 3) I AGREE ��ư */}
                    <button
                        className="img-btn agree-btn"
                        onClick={() => setAgreed(true)}
                        disabled={agreed}
                        aria-label="I AGREE"
                        title={agreed ? "���ǵ�" : "�����ϱ�"}
                    >
                        <img src={agreed ? "/I_AGREE_on.png" : "/I_AGREE_off.png"} alt="I AGREE" />
                    </button>

                    {/* 4) START ��ư */}
                    {agreed ? (
                        <button className="img-btn start-btn" onClick={() => setPage(1)} aria-label="START" title="�����ϱ�">
                            <img src="/START_on.png" alt="START" />
                        </button>
                    ) : (
                        <button className="img-btn start-btn" aria-label="START" title="���ǰ� �ʿ��մϴ�" disabled>
                            <img src="/START_off.png" alt="START ��Ȱ��" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
