"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AdminJobsListSkeleton } from "@/components/skeletons";
import { fetchAPI } from "@/lib/api";
import { Job } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, Edit, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const statusColors: Record<string, string> = {
    draft: "bg-gray-100 text-gray-700",
    published: "bg-green-100 text-green-700",
    closed: "bg-red-100 text-red-700",
};

export default function AdminJobsPage() {
    const [jobs, setJobs] = useState<Job[] | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchJobs = async () => {
        try {
            const data = await fetchAPI<Job[]>("/jobs?all=true");
            setJobs(data);
        } catch {
            toast.error("Failed to load jobs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await fetchAPI(`/jobs/${id}`, { method: "DELETE" });
            toast.success("Job deleted");
            setJobs((prev) => prev?.filter((j) => j._id !== id) || []);
        } catch {
            toast.error("Failed to delete job");
        }
    };

    const handleStatusChange = async (id: string, status: string) => {
        try {
            await fetchAPI(`/jobs/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ status }),
            });
            toast.success("Status updated");
            setJobs((prev) =>
                prev?.map((j) => (j._id === id ? { ...j, status: status as Job["status"] } : j)) || []
            );
        } catch {
            toast.error("Failed to update status");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
            <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Link href="/admin">
                            <Button variant="outline" size="icon">
                                <ArrowLeft className="w-4 h-4" />
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold">Job Listings</h1>
                            <p className="text-slate-600">Manage open positions</p>
                        </div>
                    </div>
                    <Link href="/admin/jobs/new">
                        <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                            <Plus className="w-4 h-4 mr-2" />
                            New Job
                        </Button>
                    </Link>
                </div>

                {loading ? (
                    <AdminJobsListSkeleton />
                ) : jobs?.length === 0 ? (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <p className="text-slate-500 mb-4">No jobs yet</p>
                            <Link href="/admin/jobs/new">
                                <Button>Create First Job</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        {jobs?.map((job) => (
                            <Card key={job._id}>
                                <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="font-semibold text-lg">
                                                {job.title}
                                            </h3>
                                            <Badge className={statusColors[job.status]}>
                                                {job.status}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-slate-500">
                                            {job.department} · {job.location} ·{" "}
                                            {formatDistanceToNow(
                                                new Date(job.createdAt),
                                                { addSuffix: true }
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Select
                                            value={job.status}
                                            onValueChange={(v) =>
                                                handleStatusChange(job._id, v)
                                            }
                                        >
                                            <SelectTrigger className="w-36">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">
                                                    Draft
                                                </SelectItem>
                                                <SelectItem value="published">
                                                    Published
                                                </SelectItem>
                                                <SelectItem value="closed">
                                                    Closed
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <Link href={`/admin/jobs/${job._id}`}>
                                            <Button variant="outline" size="icon">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="text-red-600"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>
                                                        Delete job?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This will permanently delete
                                                        &quot;{job.title}&quot;.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() =>
                                                            handleDelete(job._id)
                                                        }
                                                    >
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
