"use client";

import { motion } from "framer-motion";

export default function FloatingBubbles() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -inset-[10px] opacity-60">
                <motion.div
                    className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/40 blur-3xl"
                    animate={{
                        x: [0, 50, -50, 0],
                        y: [0, -50, 50, 0],
                        scale: [1, 1.1, 0.9, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
                <motion.div
                    className="absolute top-1/4 right-1/4 h-72 w-72 rounded-full bg-teal-500/35 blur-3xl"
                    animate={{
                        x: [0, -70, 70, 0],
                        y: [0, 70, -70, 0],
                        scale: [1, 0.9, 1.1, 1],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1,
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 left-1/3 h-80 w-80 rounded-full bg-amber-500/25 blur-3xl"
                    animate={{
                        x: [0, 60, -60, 0],
                        y: [0, -60, 60, 0],
                        scale: [1, 1.1, 0.9, 1],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 2,
                    }}
                />
                <motion.div
                    className="absolute top-1/3 left-1/5 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl"
                    animate={{
                        x: [0, 40, -30, 0],
                        y: [0, 30, -40, 0],
                        scale: [1, 1.05, 0.95, 1],
                    }}
                    transition={{
                        duration: 22,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 0.5,
                    }}
                />
            </div>
        </div>
    );
}
