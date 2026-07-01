"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { fetchAPI } from "@/lib/api";
import { Job } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function slugify(text: string) {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

interface JobFormProps {
    initialData?: Job;
}

export default function JobForm({ initialData }: JobFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        title: initialData?.title || "",
        department: initialData?.department || "",
        location: initialData?.location || "Remote / India",
        employmentType: initialData?.employmentType || "full-time",
        experienceLevel: initialData?.experienceLevel || "mid",
        description: initialData?.description || "",
        responsibilities: initialData?.responsibilities?.join("\n") || "",
        requirements: initialData?.requirements?.join("\n") || "",
        niceToHave: initialData?.niceToHave?.join("\n") || "",
        salaryDisplay: initialData?.salaryRange?.displayText || "",
        status: initialData?.status || "draft",
        slug: initialData?.seo?.slug || "",
        seoTitle: initialData?.seo?.title || "",
        seoDescription: initialData?.seo?.description || "",
        seoKeywords: initialData?.seo?.keywords?.join(", ") || "",
        applicationDeadline: initialData?.applicationDeadline
            ? new Date(initialData.applicationDeadline).toISOString().split("T")[0]
            : "",
    });

    const handleTitleChange = (title: string) => {
        setForm((prev) => ({
            ...prev,
            title,
            slug: initialData ? prev.slug : slugify(title),
            seoTitle: prev.seoTitle || title,
            seoDescription:
                prev.seoDescription || prev.description.slice(0, 160),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            title: form.title,
            department: form.department,
            location: form.location,
            employmentType: form.employmentType,
            experienceLevel: form.experienceLevel,
            description: form.description,
            responsibilities: form.responsibilities
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean),
            requirements: form.requirements
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean),
            niceToHave: form.niceToHave
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean),
            salaryRange: {
                currency: "INR",
                displayText: form.salaryDisplay,
            },
            status: form.status,
            seo: {
                slug: form.slug,
                title: form.seoTitle || form.title,
                description:
                    form.seoDescription || form.description.slice(0, 160),
                keywords: form.seoKeywords
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
            },
            applicationDeadline: form.applicationDeadline || undefined,
        };

        try {
            if (initialData?._id) {
                await fetchAPI(`/jobs/${initialData._id}`, {
                    method: "PATCH",
                    body: JSON.stringify(payload),
                });
                toast.success("Job updated");
            } else {
                await fetchAPI("/jobs", {
                    method: "POST",
                    body: JSON.stringify(payload),
                });
                toast.success("Job created");
            }
            router.push("/admin/jobs");
            router.refresh();
        } catch {
            toast.error("Failed to save job");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Job Title *</Label>
                    <Input
                        value={form.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label>Department *</Label>
                    <Input
                        value={form.department}
                        onChange={(e) =>
                            setForm({ ...form, department: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label>Location *</Label>
                    <Input
                        value={form.location}
                        onChange={(e) =>
                            setForm({ ...form, location: e.target.value })
                        }
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label>Salary Range (display text)</Label>
                    <Input
                        value={form.salaryDisplay}
                        onChange={(e) =>
                            setForm({ ...form, salaryDisplay: e.target.value })
                        }
                        placeholder="e.g. ₹8-15 LPA"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Employment Type</Label>
                    <Select
                        value={form.employmentType}
                        onValueChange={(v) =>
                            setForm({ ...form, employmentType: v })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Experience Level</Label>
                    <Select
                        value={form.experienceLevel}
                        onValueChange={(v) =>
                            setForm({ ...form, experienceLevel: v })
                        }
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="junior">Junior</SelectItem>
                            <SelectItem value="mid">Mid</SelectItem>
                            <SelectItem value="senior">Senior</SelectItem>
                            <SelectItem value="lead">Lead</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Status</Label>
                    <Select
                        value={form.status}
                        onValueChange={(v) => setForm({ ...form, status: v })}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Published</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label>Application Deadline</Label>
                    <Input
                        type="date"
                        value={form.applicationDeadline}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                applicationDeadline: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="space-y-2">
                    <Label>URL Slug *</Label>
                    <Input
                        value={form.slug}
                        onChange={(e) =>
                            setForm({ ...form, slug: slugify(e.target.value) })
                        }
                        required
                    />
                    <p className="text-xs text-slate-500">
                        Public URL: /jobs/{form.slug || "your-role-slug"}
                    </p>
                </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 space-y-4">
                <div>
                    <h3 className="text-sm font-medium text-slate-800">
                        SEO (search & sharing)
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                        Controls how this role appears on Google and when shared
                        on social media.
                    </p>
                </div>
                <div className="space-y-2">
                    <Label>Meta title</Label>
                    <Input
                        value={form.seoTitle}
                        onChange={(e) =>
                            setForm({ ...form, seoTitle: e.target.value })
                        }
                        placeholder={form.title || "Defaults to job title"}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Meta description</Label>
                    <Textarea
                        value={form.seoDescription}
                        onChange={(e) =>
                            setForm({ ...form, seoDescription: e.target.value })
                        }
                        rows={2}
                        placeholder="Short summary for search results (max ~160 chars)"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Keywords</Label>
                    <Input
                        value={form.seoKeywords}
                        onChange={(e) =>
                            setForm({ ...form, seoKeywords: e.target.value })
                        }
                        placeholder="react, node.js, remote, full-stack"
                    />
                    <p className="text-xs text-slate-500">
                        Comma-separated. Optional but helps search relevance.
                    </p>
                </div>
            </div>

            <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea
                    value={form.description}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            description: e.target.value,
                            seoDescription:
                                form.seoDescription ||
                                e.target.value.slice(0, 160),
                        })
                    }
                    rows={5}
                    required
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label>Responsibilities (one per line)</Label>
                    <Textarea
                        value={form.responsibilities}
                        onChange={(e) =>
                            setForm({ ...form, responsibilities: e.target.value })
                        }
                        rows={6}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Requirements (one per line)</Label>
                    <Textarea
                        value={form.requirements}
                        onChange={(e) =>
                            setForm({ ...form, requirements: e.target.value })
                        }
                        rows={6}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Nice to Have (one per line)</Label>
                    <Textarea
                        value={form.niceToHave}
                        onChange={(e) =>
                            setForm({ ...form, niceToHave: e.target.value })
                        }
                        rows={6}
                    />
                </div>
            </div>

            <Button type="submit" disabled={loading}>
                {loading
                    ? "Saving..."
                    : initialData
                      ? "Update Job"
                      : "Create Job"}
            </Button>
        </form>
    );
}
