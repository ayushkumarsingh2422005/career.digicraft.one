import {
    ApplicationStatus,
    ExperienceLevel,
    StatusHistoryEntry,
} from "@/types/schemas";
import { Document, Model, Schema, Types, model, models } from "mongoose";

export interface ApplicationDocument extends Document {
    jobId: Types.ObjectId;
    jobTitle: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    experience: ExperienceLevel;
    primarySkills: string;
    secondarySkills: string;
    github: string;
    linkedin: string;
    portfolio: string;
    resume: { url: string; publicId: string };
    canJoin: string;
    coverLetter: string;
    notes: string[];
    status: ApplicationStatus;
    statusHistory: StatusHistoryEntry[];
    createdAt: Date;
    updatedAt: Date;
}

const ResumeSchema = new Schema(
    {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
    },
    { _id: false }
);

const StatusHistorySchema = new Schema<StatusHistoryEntry>(
    {
        status: {
            type: String,
            enum: ["pending", "shortlisted", "selected", "declined"],
            required: true,
        },
        changedAt: { type: Date, default: Date.now },
        changedBy: { type: String, default: "Admin" },
    },
    { _id: false }
);

const ApplicationSchema = new Schema<ApplicationDocument>(
    {
        jobId: { type: Schema.Types.ObjectId, ref: "Job", required: true },
        jobTitle: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        location: { type: String, required: true },
        experience: {
            type: String,
            enum: ["junior", "mid", "senior", "lead"],
            required: true,
        },
        primarySkills: { type: String, required: true },
        secondarySkills: { type: String, default: "" },
        github: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        portfolio: { type: String, default: "" },
        resume: { type: ResumeSchema, required: true },
        canJoin: { type: String, required: true },
        coverLetter: { type: String, required: true },
        notes: [{ type: String, default: "" }],
        status: {
            type: String,
            enum: ["pending", "shortlisted", "selected", "declined"],
            default: "pending",
        },
        statusHistory: { type: [StatusHistorySchema], default: [] },
    },
    { timestamps: true }
);

export const Application: Model<ApplicationDocument> =
    models.Application ||
    model<ApplicationDocument>("Application", ApplicationSchema);
