"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Clock, Coffee, Code, Utensils, Moon, Sun, Trophy, Award } from "lucide-react";

interface ScheduleEvent {
    time: string;
    title: string;
    details: string[];
    icon: React.ElementType;
}

interface DaySchedule {
    day: string;
    date?: string;
    events: ScheduleEvent[];
}

const schedule: DaySchedule[] = [
    {
        day: "Day 1",
        events: [
            {
                time: "08:00 AM – 10:00 AM",
                title: "Registration & Inauguration",
                icon: Award,
                details: [
                    "Participant registration and ID verification",
                    "Inauguration ceremony with guests and faculty",
                    "Overview of HackWhack 3.0 objectives and theme"
                ],
            },
            {
                time: "10:15 AM – 11:15 AM",
                title: "Breakfast",
                icon: Coffee,
                details: [
                    "Breakfast provided to all participants",
                    "Setup time for PPT presentations"
                ],
            },
            {
                time: "11:30 AM – 01:30 PM",
                title: "PPT Presentation Round",
                icon: Award,
                details: [
                    "Teams present proposed solutions on the given problem statement.",
                    "Q&A session after each presentation"
                ],
            },
            {
                time: "01:30 PM – 02:30 PM",
                title: "Lunch Break",
                icon: Utensils,
                details: [
                    "Lunch provided",
                    "Judges compile initial evaluation scores"
                ],
            },
            {
                time: "02:30 PM – 05:00 PM",
                title: "PPT Evaluation",
                icon: Award,
                details: [
                    "Shortlisting teams for the coding round",
                    "Finalization of results based on PPT performance"
                ],
            },
            {
                time: "05:00 PM – 06:00 PM",
                title: "Break & Result Declaration",
                icon: Coffee,
                details: [
                    "Refreshment break",
                    "Announcement of shortlisted teams (30 teams)"
                ],
            },
            {
                time: "06:15 PM – 06:45 PM",
                title: "Rule Explanation & Consent Letter Signing",
                icon: Award,
                details: [
                    "Coding rules and evaluation criteria explanation",
                    "Consent letter signing by all shortlisted participants"
                ],
            },
            {
                time: "07:00 PM – 09:00 PM",
                title: "Coding Round",
                icon: Code,
                details: [
                    "Official start of the hackathon coding phase",
                    "Teams begin implementation of solutions",
                    "Mentors available for technical guidance"
                ],
            },
            {
                time: "09:00 PM – 10:00 PM",
                title: "Dinner",
                icon: Utensils,
                details: [
                    "Dinner break",
                    "Relaxation and energy recharge",
                ],
            },
            {
                time: "10:00 PM – 06:00 AM",
                title: "Night Coding & Mentoring Round",
                icon: Moon,
                details: [
                    "Continuous overnight coding session",
                    "Mentor support for debugging, design, and optimization",
                    "Evaluation checkpoints at 2:00 AM and 6:00 AM"
                ],
            },
        ],
    },
    {
        day: "Day 2",
        events: [
            {
                time: "06:00 AM – 08:00 AM",
                title: "Final Evaluation",
                icon: Sun,
                details: [
                    "Final project demonstrations by teams",
                    "Evaluation based on performance, creativity, and completeness"
                ],
            },
            {
                time: "08:00 AM – 08:30 AM",
                title: "Refreshments",
                icon: Coffee,
                details: [
                    "Morning refreshments",
                    "Judges finalize scores and rankings"
                ],
            },
            {
                time: "08:30 AM – 09:30 AM",
                title: "Prize Distribution & Closing Ceremony",
                icon: Trophy,
                details: [
                    "Announcement of winners",
                    "Prize distribution and certificate presentation",
                ],
            },
        ],
    },
];

export function EventTimeline() {
    const [activeDay, setActiveDay] = useState(0);

    return (
        <section className="relative z-10 py-20">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12 text-center"
                >
                    <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                        <span className="text-gradient">Event Flow</span>
                    </h2>
                    <p className="text-muted-foreground">
                        Your 24-hour journey from idea to innovation
                    </p>
                </motion.div>

                {/* Day Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-8 flex justify-center gap-4"
                >
                    {schedule.map((daySchedule, index) => (
                        <button
                            key={daySchedule.day}
                            onClick={() => setActiveDay(index)}
                            className={cn(
                                "rounded-full px-8 py-3 font-semibold transition-all duration-300",
                                "border border-white/10 backdrop-blur-sm",
                                activeDay === index
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                    : "bg-card/50 text-muted-foreground hover:bg-card/80 hover:text-foreground"
                            )}
                        >
                            {daySchedule.day}
                        </button>
                    ))}
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-gradient-to-b from-primary via-blue-500 to-purple-500 md:block" />

                    {/* Events */}
                    <div className="space-y-6">
                        {schedule[activeDay].events.map((event, index) => (
                            <motion.div
                                key={event.title}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative"
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-6 top-6 hidden h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-background md:flex">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                </div>

                                {/* Event Card */}
                                <div className="ml-0 md:ml-20">
                                    <div
                                        className={cn(
                                            "rounded-xl p-6 transition-all duration-300",
                                            "border border-white/10 bg-card/50 backdrop-blur-xl",
                                            "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10",
                                            "transform-gpu hover:scale-[1.02] hover:-translate-y-1"
                                        )}
                                    >
                                        {/* Time & Icon */}
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                                <event.icon className="h-5 w-5 text-primary" />
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm font-medium text-primary">
                                                    {event.time}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="mb-3 text-xl font-bold text-foreground">
                                            {event.title}
                                        </h3>

                                        {/* Details */}
                                        <ul className="space-y-2">
                                            {event.details.map((detail, detailIndex) => (
                                                <li
                                                    key={detailIndex}
                                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                                >
                                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/50" />
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default EventTimeline;
