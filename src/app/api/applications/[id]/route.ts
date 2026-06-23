import { errorResponse, successResponse } from "@/lib/apiResponse";
import { authOptions } from "@/lib/auth/options";
import { connectToDB } from "@/lib/db/mongoose";
import { sendApplicationStatusEmail } from "@/lib/email/brevo";
import { sendApplicationStatusNotification } from "@/lib/telegram/telegram";
import { Application } from "@/schemas/Application";
import { ApplicationStatus } from "@/types/schemas";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    params: Promise<{ id: string }>;
}

const VALID_STATUSES: ApplicationStatus[] = [
    "pending",
    "shortlisted",
    "selected",
    "declined",
];

export async function GET(_: NextRequest, { params }: Params) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json(errorResponse("Unauthorized"), {
            status: 401,
        });

    try {
        await connectToDB();
        const { id } = await params;
        const application = await Application.findById(id).populate(
            "jobId",
            "title seo.slug"
        );
        if (!application)
            return NextResponse.json(errorResponse("Not found"), {
                status: 404,
            });
        return NextResponse.json(successResponse(application));
    } catch (err) {
        return NextResponse.json(
            errorResponse("Error fetching application", err as Error),
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
        const deleted = await Application.findByIdAndDelete(id);
        if (!deleted)
            return NextResponse.json(errorResponse("Not found"), {
                status: 404,
            });
        return NextResponse.json(successResponse(null, "Application deleted"));
    } catch (err) {
        return NextResponse.json(
            errorResponse("Error deleting application", err as Error),
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

        const existing = await Application.findById(id);
        if (!existing)
            return NextResponse.json(errorResponse("Not found"), {
                status: 404,
            });

        const update: Record<string, unknown> = {};

        if (body.status) {
            if (!VALID_STATUSES.includes(body.status))
                return NextResponse.json(
                    errorResponse("Invalid status"),
                    { status: 400 }
                );
            update.status = body.status;
            if (body.status !== existing.status) {
                update.statusHistory = [
                    ...(existing.statusHistory || []),
                    {
                        status: body.status,
                        changedAt: new Date(),
                        changedBy: session.user?.name || "Admin",
                    },
                ];
            }
        }

        if (body.notes) {
            if (!Array.isArray(body.notes))
                return NextResponse.json(
                    errorResponse("Invalid notes"),
                    { status: 400 }
                );
            update.notes = body.notes;
        }

        const updated = await Application.findByIdAndUpdate(id, update, {
            new: true,
        });

        if (
            body.status &&
            body.status !== existing.status &&
            body.status !== "pending"
        ) {
            try {
                await sendApplicationStatusEmail({
                    name: existing.name,
                    email: existing.email,
                    jobTitle: existing.jobTitle,
                    status: body.status,
                });
            } catch (e) {
                console.error("Status email failed:", e);
            }

            try {
                await sendApplicationStatusNotification({
                    name: existing.name,
                    jobTitle: existing.jobTitle,
                    status: body.status,
                });
            } catch (e) {
                console.error("Status telegram failed:", e);
            }
        }

        return NextResponse.json(
            successResponse(updated, "Application updated")
        );
    } catch (err) {
        return NextResponse.json(
            errorResponse("Failed to update application", err as Error),
            { status: 500 }
        );
    }
}
