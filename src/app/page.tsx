"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Clock, Users, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowingCard } from "@/components/ui/glowing-effect";
import { HeroGlass } from "@/components/ui/glassmorphism-card";
import { InfiniteGrid } from "@/components/ui/infinite-grid";
import { EventTimeline } from "@/components/ui/event-timeline";
import { RulesGuidelines } from "@/components/ui/rules-guidelines";
import LoaderWrapper from "@/components/ui/loader-wrapper";
import { cn } from "@/lib/utils";

const features = [
    {
        icon: Clock,
        title: "24 Hour Hackathon",
        description: "Non-stop coding marathon to build innovative solutions",
    },
    {
        icon: Users,
        title: "Team Registration",
        description: "Register your team of up to 4 members easily",
    },
];

export default function LandingPage() {
    return (
        <LoaderWrapper>
            <div className="min-h-screen bg-background transition-colors duration-300">
                {/* Infinite Grid Background */}
                <div className="pointer-events-none fixed inset-0 overflow-hidden">
                    <InfiniteGrid />
                </div>

                {/* Navigation */}
                <nav className="relative z-50 transition-colors duration-300 w-full">
                    <div className="relative mx-auto flex h-24 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                        {/* Left Logo - SB Jain */}
                        <div className="flex-1 flex justify-start">
                            <Image
                                src="/logos/3.png"
                                alt="S.B. Jain Logo"
                                width={200}
                                height={150}
                                className="h-28 w-auto object-contain sm:h-32"
                                priority
                            />
                        </div>

                        {/* Middle Logo - Hack Whack */}
                        <div className="flex-1 flex justify-center">
                            <Image
                                src="/logo.png"
                                alt="Hack Whack 3.0 Logo"
                                width={200}
                                height={150}
                                className="h-28 w-auto object-contain sm:h-32"
                                priority
                            />
                        </div>

                        {/* Right Logo - Sui Generis */}
                        <div className="flex-1 flex justify-center sm:justify-end sm:pr-15">
                            <Image
                                src="/logos/suigeneris_logo.png"
                                alt="Forum Sui Generis Logo"
                                width={50}
                                height={50}
                                // className="h-28 w-auto object-contain sm:h-32"
                                priority
                            />
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative z-10 py-10 sm:py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="text-center"
                        >
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                                className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary backdrop-blur-sm"
                            >
                                <Sparkles className="h-4 w-4" />
                                CSE Department & Forum Suigeneris Present
                            </motion.div>

                            {/* Main Title */}
                            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                                <span className="text-gradient">Hack Whack</span>
                                <span className="text-foreground"> 3.0</span>
                            </h1>

                            {/* Tagline */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="mb-8 text-xl text-muted-foreground sm:text-2xl"
                            >
                                <span className="font-medium text-primary">Innovate</span>
                                <span className="mx-3 text-primary/50">•</span>
                                <span className="font-medium text-blue-400">Build</span>
                                <span className="mx-3 text-primary/50">•</span>
                                <span className="font-medium text-purple-400">Compete</span>
                            </motion.p>

                            {/* Hero Glass Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                className="mx-auto mb-12 max-w-2xl"
                            >
                                <HeroGlass>
                                    <p className="text-lg text-muted-foreground">
                                        Join us for an exhilarating <span className="font-semibold text-foreground">24-hour coding marathon</span> where
                                        innovation meets execution. Build groundbreaking solutions, collaborate with
                                        brilliant minds, and compete for glory.
                                    </p>
                                </HeroGlass>
                            </motion.div>

                            {/* CTA Button */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7, duration: 0.5 }}
                            >
                                <a href="https://docs.google.com/forms/d/e/1FAIpQLSeU8oiXvMTMWfUKgZkgm7Wk4M7OZ8r-HB8mO3Rkio3jwaVpFQ/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">
                                    <Button size="xl" variant="glow" className="group">
                                        Register Now
                                        <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="relative z-10 py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-12 text-center"
                        >
                            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                                Why <span className="text-gradient">Hack Whack 3.0</span>?
                            </h2>
                            <p className="text-muted-foreground">
                                Experience the future of hackathons with cutting-edge features
                            </p>
                        </motion.div>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center max-w-5xl mx-auto">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                >
                                    <GlowingCard className="h-full text-center">
                                        <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-primary/10 p-4">
                                            <feature.icon className="h-8 w-8 text-primary" />
                                        </div>
                                        <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </GlowingCard>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Event Flow / Schedule Section */}
                <EventTimeline />

                {/* Rules & Guidelines Section */}
                <RulesGuidelines />

                {/* Event Info Section */}
                <section className="relative z-10 py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <HeroGlass className="text-center">
                                <div className="grid gap-8 md:grid-cols-3">
                                    <div>
                                        <div className="mb-2 text-4xl font-bold text-primary">24</div>
                                        <div className="text-sm uppercase tracking-wider text-muted-foreground">Hours of Coding</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-4xl font-bold text-blue-400">4</div>
                                        <div className="text-sm uppercase tracking-wider text-muted-foreground">Max Team Members</div>
                                    </div>
                                    <div>
                                        <div className="mb-2 text-4xl font-bold text-purple-400">∞</div>
                                        <div className="text-sm uppercase tracking-wider text-muted-foreground">Possibilities</div>
                                    </div>
                                </div>
                            </HeroGlass>
                        </motion.div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative z-10 border-t border-border/50 py-8 transition-colors duration-300">
                    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                        <p className="text-sm text-muted-foreground">
                            © 2026 HackWhack 3.0. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </LoaderWrapper>
    );
}
