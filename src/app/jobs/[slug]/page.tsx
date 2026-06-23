"use client";

import { JobDetailSkeleton } from "@/components/skeletons";
import PageShell from "@/components/PageShell";
import { Job } from "@/lib/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiArrowRight, FiMapPin, FiBriefcase, FiClock } from "react-icons/fi";

export default function JobDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [job, setJob] = useState<Job | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/jobs/by-slug/${slug}`)
            .then((r) => r.json())
            .then((json) => {
                if (json.success) setJob(json.data);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return <JobDetailSkeleton />;
    }

    if (!job) {
        return (
            <main className="flex min-h-screen flex-col items-center justify-center gap-4">
                <p className="text-slate-400">Job not found</p>
                <Link href="/jobs" className="text-teal-300 hover:underline">
                    Back to jobs
                </Link>
            </main>
        );
    }

    return (
        <PageShell>
            <div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
                <Link
                    href="/jobs"
                    className="mb-6 inline-block text-sm text-teal-300 transition-colors hover:text-teal-200"
                >
                    ← Back to all roles
                </Link>

                <article>
                    <span className="career-badge mb-4 inline-block">
                        {job.department}
                    </span>
                    <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-100 md:text-5xl">
                        {job.title}
                    </h1>

                    <div className="mb-12 flex flex-wrap gap-x-6 gap-y-2 border-b border-white/10 pb-8 text-sm text-slate-400">
                        <span className="flex items-center gap-2">
                            <FiMapPin className="text-violet-400" />{" "}
                            {job.location}
                        </span>
                        <span className="flex items-center gap-2">
                            <FiBriefcase className="text-violet-400" />{" "}
                            {job.employmentType}
                        </span>
                        <span className="flex items-center gap-2">
                            <FiClock className="text-violet-400" />{" "}
                            {job.experienceLevel}
                        </span>
                        {job.salaryRange?.displayText && (
                            <span className="font-medium text-amber-300/90">
                                {job.salaryRange.displayText}
                            </span>
                        )}
                    </div>

                    <div className="prose-career space-y-10">
                        <section>
                            <h2>About the Role</h2>
                            <p className="whitespace-pre-wrap">
                                {job.description}
                            </p>
                        </section>

                        {job.responsibilities?.length > 0 && (
                            <section>
                                <h2>Responsibilities</h2>
                                <ul>
                                    {job.responsibilities.map((r, i) => (
                                        <li key={i}>{r}</li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {job.requirements?.length > 0 && (
                            <section>
                                <h2>Requirements</h2>
                                <ul>
                                    {job.requirements.map((r, i) => (
                                        <li key={i}>{r}</li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {job.niceToHave?.length > 0 && (
                            <section>
                                <h2>Nice to Have</h2>
                                <ul>
                                    {job.niceToHave.map((r, i) => (
                                        <li key={i}>{r}</li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>

                    <Link
                        href={`/jobs/${slug}/apply`}
                        className="career-btn-primary mt-12"
                    >
                        Apply for this Role
                        <FiArrowRight />
                    </Link>
                </article>
            </div>
        </PageShell>
    );
}
