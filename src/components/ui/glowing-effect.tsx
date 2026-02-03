"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface GlowingEffectProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
    blur?: number;
    spread?: number;
    disabled?: boolean;
}

export function GlowingEffect({
    children,
    className,
    glowColor = "rgba(59, 130, 246, 0.5)",
    blur = 20,
    spread = 0,
    disabled = false,
}: GlowingEffectProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (disabled) return;

        const container = containerRef.current;
        const glow = glowRef.current;

        if (!container || !glow) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            glow.style.background = `radial-gradient(circle at ${x}px ${y}px, ${glowColor}, transparent 50%)`;
        };

        const handleMouseLeave = () => {
            glow.style.background = "transparent";
        };

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [glowColor, disabled]);

    return (
        <div
            ref={containerRef}
            className={cn("relative overflow-hidden", className)}
        >
            {!disabled && (
                <div
                    ref={glowRef}
                    className="pointer-events-none absolute inset-0 z-0 transition-all duration-300"
                    style={{
                        filter: `blur(${blur}px)`,
                        transform: `scale(${1 + spread / 100})`,
                    }}
                />
            )}
            <div className="relative z-10">{children}</div>
        </div>
    );
}

// Glowing Card Component
interface GlowingCardProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
}

export function GlowingCard({
    children,
    className,
    glowColor = "rgba(59, 130, 246, 0.4)",
}: GlowingCardProps) {
    return (
        <GlowingEffect glowColor={glowColor} className="rounded-xl">
            <div
                className={cn(
                    "glass rounded-xl p-6 transition-all duration-300 hover:border-primary/30",
                    "border border-white/10 bg-card/50 backdrop-blur-xl",
                    "shadow-3d hover:shadow-3d-hover card-3d",
                    "transform-gpu hover:scale-105 hover:-translate-y-2 hover:rotate-x-2",
                    "hover:shadow-xl hover:shadow-primary/20",
                    className
                )}
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            >
                {children}
            </div>
        </GlowingEffect>
    );
}

// Animated Glow Border
interface GlowBorderProps {
    children: React.ReactNode;
    className?: string;
    animate?: boolean;
}

export function GlowBorder({
    children,
    className,
    animate = true,
}: GlowBorderProps) {
    return (
        <div className={cn("relative group", className)}>
            <div
                className={cn(
                    "absolute -inset-0.5 rounded-xl opacity-50 blur-sm transition-opacity duration-500",
                    "bg-gradient-to-r from-primary via-blue-400 to-purple-500",
                    animate && "animate-gradient bg-[length:200%_200%]",
                    "group-hover:opacity-75"
                )}
            />
            <div className="relative rounded-xl bg-card">{children}</div>
        </div>
    );
}
