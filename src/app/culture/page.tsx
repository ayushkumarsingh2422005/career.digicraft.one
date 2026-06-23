"use client";

import PageShell from "@/components/PageShell";
import SectionHeading from "@/components/SectionHeading";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiCheck, FiArrowRight } from "react-icons/fi";

const team = [
    { name: "Ayush Maurya", role: "Founder & CEO", image: "/team/ayush.png" },
    { name: "Adarsh", role: "Tech Lead", image: "/team/adarsh.jpg" },
    { name: "Harshit", role: "Developer", image: "/team/harshit.jpg" },
    { name: "Prateek", role: "Developer", image: "/team/prateek.jpg" },
    { name: "Vikash", role: "Developer", image: "/team/vikash.jpg" },
    { name: "Anshu", role: "Designer", image: "/team/anshu.jpg" },
];

const techStack = [
    "react.png",
    "nextjs.png",
    "typescript.png",
    "nodejs.png",
    "mongodb.png",
    "tailwind.svg",
    "python.png",
    "docker.png",
];

const benefits = [
    "Competitive compensation packages",
    "Remote-friendly work culture",
    "Flexible work hours",
    "Learning & development budget",
    "Cutting-edge project exposure",
    "Quick response within 24 hours",
];

export default function CulturePage() {
    return (
        <PageShell>
            <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
                <SectionHeading
                    title="Our"
                    highlight="Culture"
                    subtitle="At DigiCraft, we believe great products are built by great people. We foster innovation, collaboration, and continuous learning."
                />

                <section className="mb-20">
                    <h2 className="mb-8 text-2xl font-bold text-slate-100">
                        Why Work With Us?
                    </h2>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {benefits.map((benefit, i) => (
                            <motion.div
                                key={benefit}
                                className="glass-effect flex items-center gap-3 rounded-xl p-4"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                viewport={{ once: true }}
                            >
                                <div className="rounded-full bg-teal-400/10 p-2 text-teal-400">
                                    <FiCheck className="h-4 w-4" />
                                </div>
                                <p className="text-slate-300">{benefit}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="mb-8 text-2xl font-bold text-slate-100">
                        Meet the Team
                    </h2>
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
                        {team.map((member, i) => (
                            <motion.div
                                key={member.name}
                                className="glass-effect rounded-xl p-4 text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                viewport={{ once: true }}
                            >
                                <div className="relative mx-auto mb-3 h-20 w-20 overflow-hidden rounded-full ring-2 ring-teal-400/20">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-sm font-semibold text-slate-100">
                                    {member.name}
                                </h3>
                                <p className="text-xs text-slate-400">
                                    {member.role}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="mb-20">
                    <h2 className="mb-8 text-2xl font-bold text-slate-100">
                        Our Tech Stack
                    </h2>
                    <div className="glass-effect rounded-2xl p-8">
                        <div className="flex flex-wrap justify-center gap-8">
                            {techStack.map((tech) => (
                                <div
                                    key={tech}
                                    className="relative h-16 w-16 grayscale transition-all hover:grayscale-0"
                                >
                                    <Image
                                        src={`/tech/${tech}`}
                                        alt={tech}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="glass-effect rounded-2xl p-12 text-center">
                    <h2 className="mb-4 text-2xl font-bold text-slate-100">
                        Ready to join us?
                    </h2>
                    <p className="mb-6 text-slate-400">
                        Explore our open positions and start your journey with
                        DigiCraft.
                    </p>
                    <Link href="/jobs" className="career-btn-primary">
                        View Open Roles
                        <FiArrowRight />
                    </Link>
                </div>
            </div>
        </PageShell>
    );
}
