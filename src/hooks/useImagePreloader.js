import { useEffect } from "react";

export default function useImagePreloader(sources = []) {
    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        sources.forEach((src) => {
            if (typeof src !== "string" || src.length === 0) {
                return;
            }

            const image = new window.Image();
            image.src = src;
        });
    }, [sources]);
}
