import { SITE_NAME } from "@/lib/site";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Culture & benefits",
    description:
        "Learn about life at DigiCraft — our tech stack, benefits, remote-friendly culture, and how we build production-grade software.",
    alternates: { canonical: "/culture" },
    openGraph: {
        title: `Culture & benefits | ${SITE_NAME}`,
        url: "/culture",
    },
};

export default function CultureLayout({ children }: { children: ReactNode }) {
    return children;
}
