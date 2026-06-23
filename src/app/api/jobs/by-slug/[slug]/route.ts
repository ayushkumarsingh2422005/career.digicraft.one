import { errorResponse, successResponse } from "@/lib/apiResponse";
import { connectToDB } from "@/lib/db/mongoose";
import { Job } from "@/schemas/Job";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    params: Promise<{ slug: string }>;
}

export async function GET(_: NextRequest, { params }: Params) {
    try {
        await connectToDB();
        const { slug } = await params;
        const job = await Job.findOne({ "seo.slug": slug, status: "published" });
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
