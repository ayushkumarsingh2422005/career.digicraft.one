export type EmploymentType =
    | "full-time"
    | "part-time"
    | "contract"
    | "internship";

export type ExperienceLevel = "junior" | "mid" | "senior" | "lead";

export type JobStatus = "draft" | "published" | "closed";

export type ApplicationStatus =
    | "pending"
    | "shortlisted"
    | "selected"
    | "declined";

export interface Seo {
    title: string;
    description: string;
    keywords: string[];
    slug: string;
}

export interface SalaryRange {
    min?: number;
    max?: number;
    currency: string;
    displayText: string;
}

export interface StatusHistoryEntry {
    status: ApplicationStatus;
    changedAt: Date;
    changedBy: string;
}
