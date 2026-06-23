import LogoutButton from "@/components/shared/LogoutButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authOptions } from "@/lib/auth/options";
import { connectToDB } from "@/lib/db/mongoose";
import { Application } from "@/schemas/Application";
import { Job } from "@/schemas/Job";
import {
    Briefcase,
    ChevronRight,
    FileUser,
    Plus,
} from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getStats() {
    await connectToDB();
    const [jobs, applications] = await Promise.all([
        Job.find({}).sort({ createdAt: -1 }).lean(),
        Application.find({}).sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    const allApplications = await Application.countDocuments();
    const pendingApplications = await Application.countDocuments({
        status: "pending",
    });

    return {
        totalJobs: jobs.length,
        publishedJobs: jobs.filter((j) => j.status === "published").length,
        totalApplications: allApplications,
        pendingApplications,
        recentApplications: applications,
    };
}

export default async function AdminDashboardPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");

    const stats = await getStats();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
            <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-900 to-pink-600 bg-clip-text text-transparent">
                            Careers Admin
                        </h1>
                        <p className="text-slate-600 text-lg mt-2">
                            Manage job listings and applications
                        </p>
                    </div>
                    <LogoutButton />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-slate-500">
                                Total Jobs
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{stats.totalJobs}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-slate-500">
                                Published
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-green-600">
                                {stats.publishedJobs}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-slate-500">
                                Applications
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">
                                {stats.totalApplications}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm text-slate-500">
                                Pending Review
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold text-amber-600">
                                {stats.pendingApplications}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link href="/admin/jobs/new">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                                    <Plus className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Post New Job</h3>
                                    <p className="text-sm text-slate-500">
                                        Create a job listing
                                    </p>
                                </div>
                                <ChevronRight className="ml-auto text-slate-400" />
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/admin/jobs">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                                    <Briefcase className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Manage Jobs</h3>
                                    <p className="text-sm text-slate-500">
                                        Edit, publish, or close roles
                                    </p>
                                </div>
                                <ChevronRight className="ml-auto text-slate-400" />
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/admin/applications">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white">
                                    <FileUser className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">Applications</h3>
                                    <p className="text-sm text-slate-500">
                                        Review and approve hiring
                                    </p>
                                </div>
                                <ChevronRight className="ml-auto text-slate-400" />
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {stats.recentApplications.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Applications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {stats.recentApplications.map((app) => (
                                    <li
                                        key={String(app._id)}
                                        className="flex justify-between items-center py-2 border-b last:border-0"
                                    >
                                        <div>
                                            <p className="font-medium">{app.name}</p>
                                            <p className="text-sm text-slate-500">
                                                {app.jobTitle}
                                            </p>
                                        </div>
                                        <span className="text-xs px-2 py-1 rounded-full bg-slate-100 capitalize">
                                            {app.status}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/admin/applications">
                                <Button variant="outline" className="mt-4">
                                    View All Applications
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </main>
        </div>
    );
}
