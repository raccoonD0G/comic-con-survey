import { useCallback, useEffect, useState } from "react";

import {
    BEFORE_BUTTON_BOTTOM_PERCENT,
    BEFORE_BUTTON_TARGET_GAP_PX,
    PAGE_NAV_DESIGN_HEIGHT,
    PHONE_STAGE_DESIGN_HEIGHT,
    PHONE_STAGE_DESIGN_WIDTH,
} from "../constants/surveyContent";

export default function useQuestionLayoutScale(phoneStageElement, page) {
    const [questionLayoutScale, setQuestionLayoutScale] = useState(1);

    const updateQuestionLayoutScale = useCallback(() => {
        if (!phoneStageElement) {
            return;
        }

        const rect = phoneStageElement.getBoundingClientRect();
        const availableWidth = rect.width;
        const availableHeight = rect.height - PAGE_NAV_DESIGN_HEIGHT;

        if (!Number.isFinite(availableWidth) || availableWidth <= 0) {
            return;
        }

        const widthScale = availableWidth / PHONE_STAGE_DESIGN_WIDTH;
        let heightScale = availableHeight / PHONE_STAGE_DESIGN_HEIGHT;

        const beforeButtonBottomPx =
            (BEFORE_BUTTON_BOTTOM_PERCENT / 100) * PHONE_STAGE_DESIGN_HEIGHT;
        const beforeButtonTargetHeight =
            availableHeight - BEFORE_BUTTON_TARGET_GAP_PX;

        if (
            Number.isFinite(beforeButtonBottomPx) &&
            beforeButtonBottomPx > 0 &&
            Number.isFinite(beforeButtonTargetHeight)
        ) {
            const beforeButtonScale =
                beforeButtonTargetHeight / beforeButtonBottomPx;

            if (Number.isFinite(beforeButtonScale) && beforeButtonScale > 0) {
                heightScale = Math.max(heightScale, beforeButtonScale);
            }
        }

        if (!Number.isFinite(heightScale) || heightScale <= 0) {
            heightScale = widthScale;
        }

        const nextScale = Math.min(widthScale, heightScale);

        if (Number.isFinite(nextScale) && nextScale > 0) {
            setQuestionLayoutScale(nextScale);
        }
    }, [phoneStageElement]);

    useEffect(() => {
        updateQuestionLayoutScale();
    }, [page, updateQuestionLayoutScale]);

    useEffect(() => {
        if (!phoneStageElement || typeof window === "undefined") {
            return undefined;
        }

        let frameRequest = null;

        const handleResize = () => {
            if (frameRequest !== null) {
                cancelAnimationFrame(frameRequest);
            }

            frameRequest = window.requestAnimationFrame(() => {
                frameRequest = null;
                updateQuestionLayoutScale();
            });
        };

        updateQuestionLayoutScale();

        if (typeof window.ResizeObserver === "function") {
            const observer = new window.ResizeObserver(handleResize);
            observer.observe(phoneStageElement);

            return () => {
                if (frameRequest !== null) {
                    cancelAnimationFrame(frameRequest);
                }
                observer.disconnect();
            };
        }

        window.addEventListener("resize", handleResize);

        return () => {
            if (frameRequest !== null) {
                cancelAnimationFrame(frameRequest);
            }
            window.removeEventListener("resize", handleResize);
        };
    }, [phoneStageElement, updateQuestionLayoutScale]);

    return questionLayoutScale;
}
