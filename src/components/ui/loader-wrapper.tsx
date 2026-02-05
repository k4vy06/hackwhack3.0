"use client";

import { useState, useEffect } from "react";
import { InteractiveLoader } from "./interactive-loader";

export default function LoaderWrapper({ children }: { children: React.ReactNode }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        // Check if loader has already been shown this session
        const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");
        if (hasSeenLoader) {
            setShowLoader(false);
            setIsLoaded(true);
        }
    }, []);

    const handleComplete = () => {
        setIsLoaded(true);
        sessionStorage.setItem("hasSeenLoader", "true");
        // Add a small delay to allow exit animation to play or just state transition
        setTimeout(() => setShowLoader(false), 500);
    };

    if (!isLoaded && showLoader) {
        return <InteractiveLoader onComplete={handleComplete} />;
    }

    return (
        <>
            {showLoader && <InteractiveLoader onComplete={handleComplete} />}
            <div className={!isLoaded ? "hidden" : "block"}>
                {children}
            </div>
        </>
    );
}
