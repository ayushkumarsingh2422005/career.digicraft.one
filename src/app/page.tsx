"use client";

import CareerHero from "@/components/CareerHero";
import Footer from "@/components/Footer";
import JobCard from "@/components/JobCard";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import { JobsGridSkeleton } from "@/components/skeletons";
import { Job } from "@/lib/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowRight, FiUsers, FiZap, FiHeart } from "react-icons/fi";

const perks = [
    {
        icon: FiZap,
        title: "Innovative Projects",
        desc: "Work on cutting-edge web, mobile, and AI products that reach real users.",
        color: "text-amber-400",
        bg: "bg-amber-400/10",
    },
    {
        icon: FiUsers,
        title: "Collaborative Team",
        desc: "Join passionate builders who support each other and ship together.",
        color: "text-teal-400",
        bg: "bg-teal-400/10",
    },
    {
        icon: FiHeart,
        title: "Growth Culture",
        desc: "Learning budget, mentorship, and clear paths to advance your career.",
        color: "text-violet-400",
        bg: "bg-violet-400/10",
    },
];

export default function HomePage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [jobsLoading, setJobsLoading] = useState(true);

    useEffect(() => {
        fetch("/api/jobs")
            .then((r) => r.json())
            .then((json) => {
                if (json.success) setJobs(json.data.slice(0, 3));
            })
            .catch(console.error)
            .finally(() => setJobsLoading(false));
    }, []);

    return (
        <>
            <Navbar />
            <CareerHero />

            <section className="relative py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <SectionHeading
                        title="Why"
                        highlight="Join Us"
                        subtitle="We're building more than software — we're building a place where talented people thrive."
                        align="center"
                    />
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {perks.map((perk, i) => (
                            <motion.div
                                key={perk.title}
                                className="glass-effect rounded-2xl p-8 text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div
                                    className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${perk.bg}`}
                                >
                                    <perk.icon className={`h-7 w-7 ${perk.color}`} />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-slate-100">
                                    {perk.title}
                                </h3>
                                <p className="text-slate-400 leading-relaxed">
                                    {perk.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {(jobsLoading || jobs.length > 0) && (
                <section className="relative py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <SectionHeading
                                title="Open"
                                highlight="Positions"
                                subtitle="Find a role that matches your skills and ambitions."
                            />
                            {!jobsLoading && (
                                <Link
                                    href="/jobs"
                                    className="inline-flex items-center gap-2 text-teal-300 transition-colors hover:text-teal-200"
                                >
                                    View all roles <FiArrowRight />
                                </Link>
                            )}
                        </div>
                        {jobsLoading ? (
                            <JobsGridSkeleton count={3} />
                        ) : (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                {jobs.map((job) => (
                                    <JobCard key={job._id} job={job} />
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            <section className="relative pb-24">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="glass-effect rounded-2xl p-10 text-center md:p-14">
                        <h2 className="mb-4 text-3xl font-bold text-slate-100">
                            Ready to make an <span className="text-gradient">impact</span>?
                        </h2>
                        <p className="mx-auto mb-8 max-w-xl text-slate-400">
                            We&apos;re always looking for talented people. Explore
                            our open roles and apply today.
                        </p>
                        <Link href="/jobs" className="career-btn-primary">
                            Browse Open Roles
                            <FiArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
