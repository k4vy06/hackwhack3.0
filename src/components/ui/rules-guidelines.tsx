"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import {
    Clock,
    Users,
    Code,
    Ban,
    Shield,
    BookOpen,
    CheckCircle,
    Upload,
    HelpCircle,
    AlertTriangle,
    Gavel
} from "lucide-react";

interface Rule {
    icon: React.ElementType;
    title: string;
    description: string;
    highlight?: boolean;
}

const rules: Rule[] = [
    {
        icon: Clock,
        title: "24-Hour Timeline",
        description: "The hackathon is a 24-hour continuous coding event; teams must adhere strictly to the given timeline.",
    },
    {
        icon: Users,
        title: "Team Composition",
        description: "Teams must consist of the registered members only; no substitution is allowed after the event begins.",
    },
    {
        icon: Code,
        title: "Coding Duration",
        description: "All coding must be done only during the official hackathon duration.",
    },
    {
        icon: Ban,
        title: "No Pre-Built Code",
        description: "Use of pre-built code, templates, or previously developed projects is prohibited.",
        highlight: true,
    },
    {
        icon: Shield,
        title: "Ethical Coding",
        description: "Participants must follow ethical coding practices; plagiarism or code copying will lead to disqualification.",
        highlight: true,
    },
    {
        icon: BookOpen,
        title: "Open Source Usage",
        description: "Teams may use open-source libraries, APIs, and frameworks, provided they are properly acknowledged.",
    },
    {
        icon: CheckCircle,
        title: "Evaluation Checkpoints",
        description: "Regular evaluation checkpoints will be conducted by judges and mentors.",
    },
    {
        icon: Upload,
        title: "Submission Deadline",
        description: "Teams must submit their final project before the submission deadline in the prescribed format.",
    },
    {
        icon: HelpCircle,
        title: "Mentor Guidance",
        description: "Mentors are available for guidance, but direct implementation by mentors is not allowed.",
    },
    {
        icon: AlertTriangle,
        title: "Misconduct Policy",
        description: "Any form of misconduct, rule violation, or unfair practice will result in immediate disqualification.",
        highlight: true,
    },
    {
        icon: Gavel,
        title: "Final Decision",
        description: "The decision of the judges and organizing committee will be final and binding.",
    },
];

export function RulesGuidelines() {
    return (
        <section className="relative z-10 py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                        <span className="text-gradient">Rules & Guidelines</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Please read and follow these rules carefully to ensure a fair and successful hackathon experience
                    </p>
                </motion.div>

                {/* Rules Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {rules.map((rule, index) => (
                        <motion.div
                            key={rule.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                            <div
                                className={cn(
                                    "h-full rounded-xl p-5 transition-all duration-300",
                                    "border bg-card/50 backdrop-blur-xl",
                                    "hover:shadow-lg hover:-translate-y-1 transform-gpu",
                                    rule.highlight
                                        ? "border-red-500/30 hover:border-red-500/50 hover:shadow-red-500/10"
                                        : "border-white/10 hover:border-primary/30 hover:shadow-primary/10"
                                )}
                            >
                                {/* Icon and Title */}
                                <div className="flex items-start gap-3 mb-3">
                                    <div className={cn(
                                        "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg",
                                        rule.highlight ? "bg-red-500/10" : "bg-primary/10"
                                    )}>
                                        <rule.icon className={cn(
                                            "h-5 w-5",
                                            rule.highlight ? "text-red-500" : "text-primary"
                                        )} />
                                    </div>
                                    <h3 className="text-base font-semibold text-foreground pt-2">
                                        {rule.title}
                                    </h3>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {rule.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Important Notice */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-8"
                >
                    <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                            <p className="text-sm text-yellow-200/80">
                                <span className="font-semibold">Important:</span> Violation of any rule may result in disqualification. When in doubt, consult a mentor or organizer.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default RulesGuidelines;
