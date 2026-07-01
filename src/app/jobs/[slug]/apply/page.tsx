import { getPublishedJobBySlug } from "@/lib/jobs/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ApplyPageClient from "./ApplyPageClient";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const job = await getPublishedJobBySlug(slug);

    return {
        title: job ? `Apply – ${job.title}` : "Apply",
        robots: { index: false, follow: true },
    };
}

export default async function ApplyPage({ params }: PageProps) {
    const { slug } = await params;
    const job = await getPublishedJobBySlug(slug);

    if (!job) notFound();

    return <ApplyPageClient job={job} slug={slug} />;
}
