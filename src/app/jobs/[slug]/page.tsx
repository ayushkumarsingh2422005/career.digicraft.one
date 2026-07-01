import JsonLd from "@/components/seo/JsonLd";
import PageShell from "@/components/PageShell";
import { getPublishedJobBySlug } from "@/lib/jobs/server";
import {
    buildJobPageMetadata,
    buildJobPostingJsonLd,
} from "@/lib/seo/job";
import type { Metadata } from "next";
import Link from "next/link";
import JobDetailClient from "./JobDetailClient";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const job = await getPublishedJobBySlug(slug);
    if (!job) {
        return { title: "Job not found" };
    }
    return buildJobPageMetadata(job, slug);
}

export default async function JobDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const job = await getPublishedJobBySlug(slug);

    if (!job) {
        return (
            <PageShell>
                <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
                    <p className="text-(--career-text-muted)">Job not found</p>
                    <Link href="/jobs" className="career-link text-sm">
                        Back to open roles
                    </Link>
                </div>
            </PageShell>
        );
    }

    return (
        <>
            <JsonLd data={buildJobPostingJsonLd(job, slug)} />
            <JobDetailClient job={job} slug={slug} />
        </>
    );
}
