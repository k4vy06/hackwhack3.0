"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface Input3DProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input3D = forwardRef<HTMLInputElement, Input3DProps>(
    ({ className, label, error, icon, type, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            {icon}
                        </div>
                    )}
                    <input
                        type={type}
                        className={cn(
                            "input-3d w-full rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground",
                            "outline-none transition-all duration-300",
                            "focus:ring-2 focus:ring-primary/20",
                            icon && "pl-10",
                            error && "border-destructive focus:ring-destructive/20",
                            className
                        )}
                        ref={ref}
                        {...props}
                    />
                </div>
                {error && (
                    <p className="mt-1 text-sm text-destructive">{error}</p>
                )}
            </div>
        );
    }
);

Input3D.displayName = "Input3D";

// Textarea variant
export interface Textarea3DProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const Textarea3D = forwardRef<HTMLTextAreaElement, Textarea3DProps>(
    ({ className, label, error, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="mb-2 block text-sm font-medium text-foreground">
                        {label}
                    </label>
                )}
                <textarea
                    className={cn(
                        "input-3d w-full rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground",
                        "outline-none transition-all duration-300",
                        "focus:ring-2 focus:ring-primary/20",
                        "min-h-[100px] resize-none",
                        error && "border-destructive focus:ring-destructive/20",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-sm text-destructive">{error}</p>
                )}
            </div>
        );
    }
);

Textarea3D.displayName = "Textarea3D";
