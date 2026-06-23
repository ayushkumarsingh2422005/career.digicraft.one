import JobForm from "../../_components/JobForm";
import { Button } from "@/components/ui/button";
import { connectToDB } from "@/lib/db/mongoose";
import { Job } from "@/schemas/Job";
import { Job as JobType } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function EditJobPage({ params }: Props) {
    const { id } = await params;
    await connectToDB();
    const job = await Job.findById(id).lean();
    if (!job) notFound();

    const jobData: JobType = {
        _id: String(job._id),
        title: job.title,
        department: job.department,
        location: job.location,
        employmentType: job.employmentType,
        experienceLevel: job.experienceLevel,
        description: job.description,
        responsibilities: job.responsibilities,
        requirements: job.requirements,
        niceToHave: job.niceToHave,
        salaryRange: job.salaryRange,
        status: job.status,
        seo: job.seo,
        publishedAt: job.publishedAt?.toISOString(),
        applicationDeadline: job.applicationDeadline?.toISOString(),
        createdAt: job.createdAt.toISOString(),
        updatedAt: job.updatedAt.toISOString(),
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
            <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Edit Job</h1>
                        <p className="text-slate-600">{job.title}</p>
                    </div>
                    <Link href="/admin/jobs">
                        <Button variant="outline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                    </Link>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8">
                    <JobForm initialData={jobData} />
                </div>
            </main>
        </div>
    );
}
