export const SITE_NAME = "DigiCraft Careers";

export const DEFAULT_DESCRIPTION =
    "Explore career opportunities at DigiCraft. Join our team building reliable, production-grade digital products.";

export const COMPANY_NAME = "DigiCraft Innovation Private Limited";

/** Public careers site origin — set NEXT_PUBLIC_BASE_URL in production. */
export function getSiteUrl(): string {
    const url =
        process.env.NEXT_PUBLIC_BASE_URL ?? "https://career.digicraft.one";
    return url.replace(/\/$/, "");
}

export function absoluteUrl(path: string): string {
    const normalized = path.startsWith("/") ? path : `/${path}`;
    return `${getSiteUrl()}${normalized}`;
}
