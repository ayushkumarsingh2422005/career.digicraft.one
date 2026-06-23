import Link from "next/link";
import { Job } from "@/lib/types";
import { MapPin, Briefcase, Clock, ArrowUpRight } from "lucide-react";

interface JobCardProps {
    job: Job;
}

const employmentLabels: Record<string, string> = {
    "full-time": "Full-time",
    "part-time": "Part-time",
    contract: "Contract",
    internship: "Internship",
};

const levelLabels: Record<string, string> = {
    junior: "Junior",
    mid: "Mid-Level",
    senior: "Senior",
    lead: "Lead",
};

export default function JobCard({ job }: JobCardProps) {
    return (
        <Link href={`/jobs/${job.seo.slug}`} className="group block h-full">
            <article className="glass-effect flex h-full flex-col rounded-2xl p-6 transition-all duration-300">
                <div className="mb-3 flex items-start justify-between gap-3">
                    <span className="career-badge">{job.department}</span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-500 transition-all group-hover:text-teal-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <h3 className="mb-3 text-xl font-bold text-slate-100 transition-colors group-hover:text-teal-200">
                    {job.title}
                </h3>

                <div className="mb-4 flex flex-wrap gap-3 text-sm text-slate-400">
                    <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-violet-400/80" />
                        {job.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Briefcase className="h-4 w-4 text-violet-400/80" />
                        {employmentLabels[job.employmentType]}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-violet-400/80" />
                        {levelLabels[job.experienceLevel]}
                    </span>
                </div>

                {job.salaryRange?.displayText && (
                    <p className="mb-3 text-sm font-medium text-amber-300/90">
                        {job.salaryRange.displayText}
                    </p>
                )}

                <p className="mt-auto line-clamp-2 text-sm leading-relaxed text-slate-400">
                    {job.description}
                </p>
            </article>
        </Link>
    );
}
