import { errorResponse, successResponse } from "@/lib/apiResponse";
import { authOptions } from "@/lib/auth/options";
import { connectToDB } from "@/lib/db/mongoose";
import { Job } from "@/schemas/Job";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    params: Promise<{ id: string }>;
}

export async function GET(_: NextRequest, { params }: Params) {
    try {
        await connectToDB();
        const { id } = await params;
        const job = await Job.findById(id);
        if (!job)
            return NextResponse.json(errorResponse("Not found"), {
                status: 404,
            });
        return NextResponse.json(successResponse(job));
    } catch (err) {
        return NextResponse.json(
            errorResponse("Error fetching job", err as Error),
            { status: 500 }
        );
    }
}

export async function PATCH(req: NextRequest, { params }: Params) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json(errorResponse("Unauthorized"), {
            status: 401,
        });

    try {
        await connectToDB();
        const { id } = await params;
        const body = await req.json();

        if (body.seo?.slug) {
            const existing = await Job.findOne({
                "seo.slug": body.seo.slug,
                _id: { $ne: id },
            });
            if (existing)
                return NextResponse.json(
                    errorResponse("Slug already exists"),
                    { status: 400 }
                );
        }

        const updateData = { ...body };
        if (body.status === "published" && !body.publishedAt) {
            updateData.publishedAt = new Date();
        }

        const updated = await Job.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        if (!updated)
            return NextResponse.json(errorResponse("Not found"), {
                status: 404,
            });

        return NextResponse.json(successResponse(updated, "Job updated"));
    } catch (err) {
        return NextResponse.json(
            errorResponse("Failed to update job", err as Error),
            { status: 500 }
        );
    }
}

export async function DELETE(_: NextRequest, { params }: Params) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json(errorResponse("Unauthorized"), {
            status: 401,
        });

    try {
        await connectToDB();
        const { id } = await params;
        const deleted = await Job.findByIdAndDelete(id);
        if (!deleted)
            return NextResponse.json(errorResponse("Not found"), {
                status: 404,
            });
        return NextResponse.json(successResponse(null, "Job deleted"));
    } catch (err) {
        return NextResponse.json(
            errorResponse("Error deleting job", err as Error),
            { status: 500 }
        );
    }
}
