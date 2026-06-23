import JobForm from "../../_components/JobForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateJobPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
            <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Post New Job</h1>
                        <p className="text-slate-600">Create a new job listing</p>
                    </div>
                    <Link href="/admin/jobs">
                        <Button variant="outline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                    </Link>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8">
                    <JobForm />
                </div>
            </main>
        </div>
    );
}
