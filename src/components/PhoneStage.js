import React, { forwardRef, useEffect, useRef } from "react";

const PhoneStage = forwardRef(function PhoneStage(
    { backgroundUrl, innerClassName, page, children },
    ref
) {
    const isInitialRenderRef = useRef(true);

    useEffect(() => {
        isInitialRenderRef.current = false;
    }, []);

    const innerClasses = ["phone-stage-inner"];
    if (innerClassName) {
        innerClasses.push(innerClassName);
    }

    const contentClasses = ["phone-stage-content"];
    if (isInitialRenderRef.current) {
        contentClasses.push("is-initial");
    }

    return (
        <div className="app-root">
            <div className="phone-stage" ref={ref}>
                <div
                    className={innerClasses.join(" ")}
                    style={{
                        backgroundImage: `url(${backgroundUrl})`,
                    }}
                >
                    <div key={page} className={contentClasses.join(" ")}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default PhoneStage;
