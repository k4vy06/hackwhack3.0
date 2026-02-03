"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlassmorphismCardProps {
    children: React.ReactNode;
    className?: string;
    hover3D?: boolean;
    glowOnHover?: boolean;
}

export function GlassmorphismCard({
    children,
    className,
    hover3D = true,
    glowOnHover = true,
}: GlassmorphismCardProps) {
    return (
        <div
            className={cn(
                "relative rounded-2xl p-6",
                "bg-white/5 backdrop-blur-xl",
                "border border-white/10",
                "shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]",
                hover3D && "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_0_rgba(0,0,0,0.45)]",
                glowOnHover && "hover:border-primary/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
                className
            )}
        >
            {/* Inner highlight */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}

// Hero Glass Container
interface HeroGlassProps {
    children: React.ReactNode;
    className?: string;
}

export function HeroGlass({ children, className }: HeroGlassProps) {
    return (
        <div
            className={cn(
                "relative rounded-3xl p-8 md:p-12",
                "bg-gradient-to-br from-white/10 via-white/5 to-transparent",
                "backdrop-blur-2xl",
                "border border-white/20",
                "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]",
                className
            )}
        >
            {/* Gradient overlay */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/5 via-transparent to-purple-500/5" />

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}

// Feature Card with Icon
interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description?: string;
    className?: string;
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
    return (
        <GlassmorphismCard className={cn("text-center", className)}>
            <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 p-3 text-primary">
                {icon}
            </div>
            <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
            {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
            )}
        </GlassmorphismCard>
    );
}
