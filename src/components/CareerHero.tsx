"use client";

import FloatingBubbles from "@/components/FloatingBubbles";
import FloatingParticles from "@/components/FloatingParticles";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function CareerHero() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section
            ref={sectionRef}
            className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-violet-950/30 via-[#080c14] to-[#080c14]"
        >
            {/* Flowing bubbles & particles — hero only, clipped by overflow-hidden */}
            <FloatingBubbles />
            <FloatingParticles />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.12)_0%,transparent_65%)]" />

            <motion.div
                style={{ y, opacity }}
                className="relative z-10 mx-auto max-w-5xl px-4 py-32 text-center sm:px-6 lg:px-8"
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8 flex items-center justify-center gap-2"
                >
                    <SparklesIcon className="h-5 w-5 text-teal-400" />
                    <span className="font-mono text-sm tracking-wide text-teal-300/90">
                        Grow with DigiCraft
                    </span>
                    <SparklesIcon className="h-5 w-5 text-teal-400" />
                </motion.div>

                <motion.h1
                    className="mb-6 text-5xl font-bold leading-tight md:text-7xl lg:text-8xl"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                >
                    <span className="text-gradient-hero">Shape Tomorrow&apos;s</span>
                    <br />
                    <span className="text-slate-100">Digital World</span>
                </motion.h1>

                <motion.p
                    className="mx-auto mb-10 max-w-2xl text-lg text-slate-300 md:text-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                >
                    Join a team where ambition meets craft — building products
                    that matter, with room to learn, lead, and level up.
                </motion.p>

                <motion.div
                    className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link href="/jobs" className="career-btn-primary">
                        Explore Open Roles
                        <FiArrowRight />
                    </Link>
                    <Link href="/culture" className="career-btn-secondary">
                        Life at DigiCraft
                    </Link>
                </motion.div>

                <motion.div
                    className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                >
                    <span className="career-badge">Remote-friendly</span>
                    <span className="career-badge">Growth-focused</span>
                    <span className="career-badge">Innovation-driven</span>
                </motion.div>
            </motion.div>

            <motion.div
                className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <ChevronDownIcon className="h-6 w-6 text-slate-500" />
            </motion.div>
        </section>
    );
}
