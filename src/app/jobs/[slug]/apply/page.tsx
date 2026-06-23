"use client";

import ApplicationForm from "@/components/ApplicationForm";
import PageShell from "@/components/PageShell";
import { ApplicationFormSkeleton } from "@/components/skeletons";
import { Job } from "@/lib/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ApplyPage() {
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
        return <ApplicationFormSkeleton />;
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
            <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6 lg:px-8">
                <Link
                    href={`/jobs/${slug}`}
                    className="mb-6 inline-block text-sm text-teal-300 transition-colors hover:text-teal-200"
                >
                    ← Back to job details
                </Link>
                <ApplicationForm jobId={job._id} jobTitle={job.title} />
            </div>
        </PageShell>
    );
}
