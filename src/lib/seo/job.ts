import { DIGICRAFT_LOGO_PATH } from "@/lib/branding";
import { absoluteUrl, COMPANY_NAME, SITE_NAME } from "@/lib/site";
import { Job } from "@/lib/types";
import { EmploymentType } from "@/types/schemas";
import type { Metadata } from "next";

function jobMetaTitle(job: Job): string {
    return job.seo.title?.trim() || job.title;
}

function jobMetaDescription(job: Job): string {
    const fromSeo = job.seo.description?.trim();
    if (fromSeo) return fromSeo;
    const plain = job.description.replace(/\s+/g, " ").trim();
    return plain.length > 160 ? `${plain.slice(0, 157)}…` : plain;
}

export function buildJobPageMetadata(job: Job, slug: string): Metadata {
    const title = jobMetaTitle(job);
    const description = jobMetaDescription(job);
    const canonical = `/jobs/${slug}`;
    const keywords = job.seo.keywords?.filter(Boolean);

    return {
        title,
        description,
        keywords: keywords?.length ? keywords : undefined,
        alternates: { canonical },
        openGraph: {
            title,
            description,
            url: canonical,
            type: "website",
            siteName: SITE_NAME,
            images: [
                {
                    url: DIGICRAFT_LOGO_PATH,
                    width: 512,
                    height: 512,
                    alt: "DigiCraft",
                },
            ],
        },
        twitter: {
            card: "summary",
            title,
            description,
        },
    };
}

const EMPLOYMENT_TYPE_LD: Record<EmploymentType, string> = {
    "full-time": "FULL_TIME",
    "part-time": "PART_TIME",
    contract: "CONTRACTOR",
    internship: "INTERN",
};

function isRemoteLocation(location: string): boolean {
    return /remote/i.test(location);
}

export function buildJobPostingJsonLd(job: Job, slug: string): Record<string, unknown> {
    const description = jobMetaDescription(job);
    const jobUrl = absoluteUrl(`/jobs/${slug}`);
    const applyUrl = absoluteUrl(`/jobs/${slug}/apply`);
    const remote = isRemoteLocation(job.location);

    const jobLocation = remote
        ? {
              "@type": "Place",
              address: {
                  "@type": "PostalAddress",
                  addressCountry: "IN",
              },
          }
        : {
              "@type": "Place",
              address: {
                  "@type": "PostalAddress",
                  addressLocality: job.location,
                  addressCountry: "IN",
              },
          };

    const posting: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: job.title,
        description,
        identifier: {
            "@type": "PropertyValue",
            name: SITE_NAME,
            value: job._id,
        },
        datePosted: job.publishedAt || job.createdAt,
        employmentType: EMPLOYMENT_TYPE_LD[job.employmentType],
        hiringOrganization: {
            "@type": "Organization",
            name: COMPANY_NAME,
            sameAs: "https://digicraft.one",
            logo: absoluteUrl(DIGICRAFT_LOGO_PATH),
        },
        jobLocation,
        url: jobUrl,
        directApply: true,
        applicationContact: {
            "@type": "ContactPoint",
            contactType: "applications",
            url: applyUrl,
        },
    };

    if (remote) {
        posting.jobLocationType = "TELECOMMUTE";
        posting.applicantLocationRequirements = {
            "@type": "Country",
            name: "IN",
        };
    }

    if (job.applicationDeadline) {
        posting.validThrough = job.applicationDeadline;
    }

    if (job.salaryRange?.displayText?.trim()) {
        posting.baseSalary = {
            "@type": "MonetaryAmount",
            currency: job.salaryRange.currency || "INR",
            value: {
                "@type": "QuantitativeValue",
                unitText: job.salaryRange.displayText,
            },
        };
    }

    return posting;
}

export function buildJobsIndexJsonLd(jobs: Job[]): Record<string, unknown> {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Open roles at DigiCraft",
        numberOfItems: jobs.length,
        itemListElement: jobs.map((job, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: absoluteUrl(`/jobs/${job.seo.slug}`),
            name: job.title,
        })),
    };
}
