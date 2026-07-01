import { connectToDB } from "@/lib/db/mongoose";
import { Job } from "@/schemas/Job";
import { Job as JobType } from "@/lib/types";

function serializeJob(doc: Record<string, unknown>): JobType {
    const salaryRange = (doc.salaryRange as Record<string, unknown>) || {};
    const seo = (doc.seo as Record<string, unknown>) || {};

    return {
        _id: String(doc._id),
        title: doc.title as string,
        department: doc.department as string,
        location: doc.location as string,
        employmentType: doc.employmentType as JobType["employmentType"],
        experienceLevel: doc.experienceLevel as JobType["experienceLevel"],
        description: doc.description as string,
        responsibilities: (doc.responsibilities as string[]) || [],
        requirements: (doc.requirements as string[]) || [],
        niceToHave: (doc.niceToHave as string[]) || [],
        salaryRange: {
            min: salaryRange.min as number | undefined,
            max: salaryRange.max as number | undefined,
            currency: (salaryRange.currency as string) || "INR",
            displayText: (salaryRange.displayText as string) || "",
        },
        status: doc.status as JobType["status"],
        seo: {
            title: (seo.title as string) || "",
            description: (seo.description as string) || "",
            keywords: (seo.keywords as string[]) || [],
            slug: seo.slug as string,
        },
        publishedAt: doc.publishedAt
            ? new Date(doc.publishedAt as string | Date).toISOString()
            : undefined,
        applicationDeadline: doc.applicationDeadline
            ? new Date(doc.applicationDeadline as string | Date).toISOString()
            : undefined,
        createdAt: new Date(doc.createdAt as string | Date).toISOString(),
        updatedAt: new Date(doc.updatedAt as string | Date).toISOString(),
    };
}

export async function getPublishedJobBySlug(
    slug: string
): Promise<JobType | null> {
    await connectToDB();
    const job = await Job.findOne({
        "seo.slug": slug,
        status: "published",
    }).lean();

    if (!job) return null;
    return serializeJob(job as unknown as Record<string, unknown>);
}

export async function getPublishedJobs(): Promise<JobType[]> {
    await connectToDB();
    const jobs = await Job.find({ status: "published" })
        .sort({ publishedAt: -1, createdAt: -1 })
        .lean();

    return jobs.map((job) =>
        serializeJob(job as unknown as Record<string, unknown>)
    );
}

export async function getPublishedJobSlugs(): Promise<
    { slug: string; updatedAt: Date }[]
> {
    await connectToDB();
    const jobs = await Job.find({ status: "published" })
        .select("seo.slug updatedAt")
        .lean();

    return jobs.map((job) => ({
        slug: job.seo.slug,
        updatedAt: job.updatedAt,
    }));
}
