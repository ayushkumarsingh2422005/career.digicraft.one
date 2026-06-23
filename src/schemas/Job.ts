import {
    EmploymentType,
    ExperienceLevel,
    JobStatus,
    SalaryRange,
    Seo,
} from "@/types/schemas";
import { Document, Model, Schema, model, models } from "mongoose";

export interface JobDocument extends Document {
    title: string;
    department: string;
    location: string;
    employmentType: EmploymentType;
    experienceLevel: ExperienceLevel;
    description: string;
    responsibilities: string[];
    requirements: string[];
    niceToHave: string[];
    salaryRange: SalaryRange;
    status: JobStatus;
    seo: Seo;
    publishedAt?: Date;
    applicationDeadline?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const SeoSchema = new Schema<Seo>(
    {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
        keywords: { type: [String], default: [] },
        slug: { type: String, required: true, unique: true, lowercase: true },
    },
    { _id: false }
);

const SalaryRangeSchema = new Schema<SalaryRange>(
    {
        min: { type: Number },
        max: { type: Number },
        currency: { type: String, default: "INR" },
        displayText: { type: String, default: "" },
    },
    { _id: false }
);

const JobSchema = new Schema<JobDocument>(
    {
        title: { type: String, required: true },
        department: { type: String, required: true },
        location: { type: String, required: true },
        employmentType: {
            type: String,
            enum: ["full-time", "part-time", "contract", "internship"],
            required: true,
        },
        experienceLevel: {
            type: String,
            enum: ["junior", "mid", "senior", "lead"],
            required: true,
        },
        description: { type: String, required: true },
        responsibilities: { type: [String], default: [] },
        requirements: { type: [String], default: [] },
        niceToHave: { type: [String], default: [] },
        salaryRange: { type: SalaryRangeSchema, default: () => ({}) },
        status: {
            type: String,
            enum: ["draft", "published", "closed"],
            default: "draft",
        },
        seo: { type: SeoSchema, required: true },
        publishedAt: { type: Date },
        applicationDeadline: { type: Date },
    },
    { timestamps: true }
);

export const Job: Model<JobDocument> =
    models.Job || model<JobDocument>("Job", JobSchema);
