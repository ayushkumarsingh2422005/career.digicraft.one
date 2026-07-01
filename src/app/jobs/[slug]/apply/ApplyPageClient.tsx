"use client";

import ApplicationForm from "@/components/ApplicationForm";
import PageShell from "@/components/PageShell";
import { Job } from "@/lib/types";
import Link from "next/link";

export default function ApplyPageClient({
    job,
    slug,
}: {
    job: Job;
    slug: string;
}) {
    return (
        <PageShell>
            <div className="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
                <Link
                    href={`/jobs/${slug}`}
                    className="mb-6 inline-block text-sm text-[var(--career-text-muted)] transition-colors hover:text-[var(--career-accent)]"
                >
                    ← Back to job details
                </Link>
                <ApplicationForm jobId={job._id} jobTitle={job.title} />
            </div>
        </PageShell>
    );
}
