import { errorResponse, successResponse } from "@/lib/apiResponse";
import { authOptions } from "@/lib/auth/options";
import { connectToDB } from "@/lib/db/mongoose";
import { Job } from "@/schemas/Job";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectToDB();
        const { searchParams } = new URL(req.url);
        const all = searchParams.get("all") === "true";

        if (all) {
            const session = await getServerSession(authOptions);
            if (!session)
                return NextResponse.json(errorResponse("Unauthorized"), {
                    status: 401,
                });
            const jobs = await Job.find({}).sort({ createdAt: -1 });
            return NextResponse.json(successResponse(jobs));
        }

        const jobs = await Job.find({ status: "published" }).sort({
            publishedAt: -1,
            createdAt: -1,
        });
        return NextResponse.json(successResponse(jobs));
    } catch (err) {
        return NextResponse.json(
            errorResponse("Failed to fetch jobs", err as Error),
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json(errorResponse("Unauthorized"), {
            status: 401,
        });

    try {
        await connectToDB();
        const body = await req.json();

        const required = ["title", "department", "location", "employmentType", "experienceLevel", "description", "seo"];
        for (const field of required) {
            if (!body[field])
                return NextResponse.json(
                    errorResponse(`Missing field: ${field}`),
                    { status: 400 }
                );
        }

        if (!body.seo?.slug)
            return NextResponse.json(
                errorResponse("SEO slug is required"),
                { status: 400 }
            );

        const existing = await Job.findOne({ "seo.slug": body.seo.slug });
        if (existing)
            return NextResponse.json(
                errorResponse("Slug already exists"),
                { status: 400 }
            );

        const jobData = {
            title: body.title,
            department: body.department,
            location: body.location,
            employmentType: body.employmentType,
            experienceLevel: body.experienceLevel,
            description: body.description,
            responsibilities: body.responsibilities || [],
            requirements: body.requirements || [],
            niceToHave: body.niceToHave || [],
            salaryRange: body.salaryRange || {
                currency: "INR",
                displayText: "",
            },
            status: body.status || "draft",
            seo: body.seo,
            applicationDeadline: body.applicationDeadline || undefined,
            publishedAt: body.status === "published" ? new Date() : undefined,
        };

        const created = await Job.create(jobData);
        return NextResponse.json(
            successResponse(created, "Job created"),
            { status: 201 }
        );
    } catch (err) {
        return NextResponse.json(
            errorResponse("Failed to create job", err as Error),
            { status: 500 }
        );
    }
}
