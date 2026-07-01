import HomePageClient from "@/components/HomePageClient";
import { DEFAULT_DESCRIPTION, SITE_NAME } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: {
        absolute: SITE_NAME,
    },
    description: DEFAULT_DESCRIPTION,
    alternates: { canonical: "/" },
    openGraph: {
        title: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        url: "/",
    },
};

export default function HomePage() {
    return <HomePageClient />;
}
