import JsonLd from "@/components/seo/JsonLd";
import { getPublishedJobs } from "@/lib/jobs/server";
import { buildJobsIndexJsonLd } from "@/lib/seo/job";
import JobsPageClient from "./JobsPageClient";

export default async function JobsPage() {
    const jobs = await getPublishedJobs();

    return (
        <>
            {jobs.length > 0 && (
                <JsonLd data={buildJobsIndexJsonLd(jobs)} />
            )}
            <JobsPageClient />
        </>
    );
}
