import { DEFAULT_DESCRIPTION, SITE_NAME } from "@/lib/site";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Open roles",
    description:
        "Browse open engineering, design, and product roles at DigiCraft. Remote-friendly opportunities across India.",
    alternates: { canonical: "/jobs" },
    openGraph: {
        title: `Open roles | ${SITE_NAME}`,
        description: DEFAULT_DESCRIPTION,
        url: "/jobs",
    },
};

export default function JobsLayout({ children }: { children: ReactNode }) {
    return children;
}
