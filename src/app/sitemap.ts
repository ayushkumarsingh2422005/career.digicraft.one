import { getPublishedJobSlugs } from "@/lib/jobs/server";
import { getSiteUrl } from "@/lib/site";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = getSiteUrl();

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/jobs`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/culture`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
    ];

    try {
        const jobs = await getPublishedJobSlugs();
        const jobPages: MetadataRoute.Sitemap = jobs.map((job) => ({
            url: `${baseUrl}/jobs/${job.slug}`,
            lastModified: job.updatedAt,
            changeFrequency: "weekly" as const,
            priority: 0.8,
        }));
        return [...staticPages, ...jobPages];
    } catch {
        return staticPages;
    }
}
