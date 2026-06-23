"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FloatingParticles() {
    const [particles, setParticles] = useState<
        { id: number; x: number; y: number; opacity: number; scale: number }[]
    >([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const width = window.innerWidth;
        const height = window.innerHeight;
        setParticles(
            Array.from({ length: 24 }, (_, i) => ({
                id: i,
                x: Math.random() * width,
                y: Math.random() * height,
                opacity: 0.15 + Math.random() * 0.45,
                scale: 0.2 + Math.random() * 0.8,
            }))
        );
    }, []);

    if (!mounted) return null;

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute h-1 w-1 rounded-full bg-teal-300/80"
                    initial={{
                        x: particle.x,
                        y: particle.y,
                        opacity: particle.opacity,
                        scale: particle.scale,
                    }}
                    animate={{
                        y: [particle.y, particle.y - 1000],
                        opacity: [particle.opacity, 0],
                    }}
                    transition={{
                        duration: 6 + Math.random() * 10,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
}
