"use client";

import JobCard from "@/components/JobCard";
import PageShell from "@/components/PageShell";
import SectionHeading from "@/components/SectionHeading";
import {
    JobsFiltersSkeleton,
    JobsGridSkeleton,
} from "@/components/skeletons";
import { Job } from "@/lib/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function JobsPage() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [deptFilter, setDeptFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get("applied") === "true") {
            toast.success("Your application has been submitted!");
        }
    }, []);

    useEffect(() => {
        fetch("/api/jobs")
            .then((r) => r.json())
            .then((json) => {
                if (json.success) setJobs(json.data);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    const departments = [...new Set(jobs.map((j) => j.department))];

    const filtered = jobs.filter((j) => {
        if (deptFilter !== "all" && j.department !== deptFilter) return false;
        if (typeFilter !== "all" && j.employmentType !== typeFilter)
            return false;
        if (
            search &&
            !j.title.toLowerCase().includes(search.toLowerCase()) &&
            !j.department.toLowerCase().includes(search.toLowerCase())
        )
            return false;
        return true;
    });

    return (
        <PageShell>
            <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
                <SectionHeading
                    title="Open"
                    highlight="Roles"
                    subtitle="Find your next opportunity at DigiCraft. We're hiring across engineering, design, and more."
                />

                {loading ? (
                    <>
                        <JobsFiltersSkeleton />
                        <JobsGridSkeleton count={6} />
                    </>
                ) : (
                    <>
                        <div className="mb-10 grid grid-cols-1 gap-3 md:grid-cols-[minmax(0,1fr)_11rem_11rem] md:items-center">
                            <input
                                placeholder="Search roles..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="career-field w-full"
                            />
                            <select
                                value={deptFilter}
                                onChange={(e) => setDeptFilter(e.target.value)}
                                className="career-field w-full"
                            >
                                <option value="all" className="bg-[#0f1520]">
                                    All Departments
                                </option>
                                {departments.map((d) => (
                                    <option
                                        key={d}
                                        value={d}
                                        className="bg-[#0f1520]"
                                    >
                                        {d}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="career-field w-full"
                            >
                                <option value="all" className="bg-[#0f1520]">
                                    All Types
                                </option>
                                <option
                                    value="full-time"
                                    className="bg-[#0f1520]"
                                >
                                    Full-time
                                </option>
                                <option
                                    value="part-time"
                                    className="bg-[#0f1520]"
                                >
                                    Part-time
                                </option>
                                <option
                                    value="contract"
                                    className="bg-[#0f1520]"
                                >
                                    Contract
                                </option>
                                <option
                                    value="internship"
                                    className="bg-[#0f1520]"
                                >
                                    Internship
                                </option>
                            </select>
                        </div>

                        {filtered.length === 0 ? (
                            <div className="glass-effect rounded-2xl p-12 text-center">
                                <p className="text-lg text-slate-400">
                                    No open positions right now. Check back soon!
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {filtered.map((job) => (
                                    <JobCard key={job._id} job={job} />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </PageShell>
    );
}
