"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface InteractiveLoaderProps {
    onComplete: () => void;
}

export function InteractiveLoader({ onComplete }: InteractiveLoaderProps) {
    const [progress, setProgress] = useState(0);
    const [isInteracted, setIsInteracted] = useState(false);

    useEffect(() => {
        if (!isInteracted) return;

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 1000);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 200);

        return () => clearInterval(timer);
    }, [isInteracted, onComplete]);

    const handleStart = () => {
        setIsInteracted(true);
    };

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden">
            {/* Cyberpunk Scanline Effect */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-10" />

            <AnimatePresence mode="wait">
                {!isInteracted ? (
                    <motion.div
                        key="start-screen"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-8 cursor-pointer group"
                        onClick={handleStart}
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.05, 1],
                                opacity: [0.8, 1, 0.8]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="relative w-48 h-48"
                        >
                            <Image
                                src="/loader-logo.png"
                                alt="HackWhack 3.0"
                                fill
                                className="object-contain"
                            />
                        </motion.div>
                        <motion.div
                            className="px-8 py-3 rounded-full border border-primary/50 bg-primary/10 text-primary font-mono tracking-widest text-lg group-hover:bg-primary group-hover:text-background transition-all"
                        >
                            INITIALIZE SYSTEM
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="loading-screen"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center gap-12 w-full max-w-md px-6"
                    >
                        <motion.div
                            animate={{
                                filter: ["hue-rotate(0deg)", "hue-rotate(20deg)", "hue-rotate(0deg)"],
                                scale: [1, 1.02, 1]
                            }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="relative w-64 h-32"
                        >
                            <Image
                                src="/loader-logo.png"
                                alt="HackWhack 3.0"
                                fill
                                className="object-contain"
                            />
                        </motion.div>

                        <div className="w-full space-y-4">
                            <div className="flex justify-between font-mono text-xs text-primary/70 mb-2">
                                <span>LOADING PROTOCOLS...</span>
                                <span>{Math.floor(progress)}%</span>
                            </div>
                            <div className="h-1 w-full bg-primary/20 rounded-full overflow-hidden relative">
                                <motion.div
                                    className="absolute inset-0 bg-primary shadow-[0_0_10px_#8b5cf6]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full opacity-40 font-mono text-[10px]">
                            <div className="space-y-1">
                                <div>{">"} BYPASSING_FIREWALL... OK</div>
                                <div>{">"} ESTABLISHING_LINK... OK</div>
                                <div>{">"} DECRYPTING_ASSETS... {progress > 40 ? "OK" : "IN PROGRESS"}</div>
                            </div>
                            <div className="space-y-1 text-right">
                                <div>SECURE_CONN: TRUE</div>
                                <div>ENCRYPTION: AES-256</div>
                                <div>PING: 12ms</div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
