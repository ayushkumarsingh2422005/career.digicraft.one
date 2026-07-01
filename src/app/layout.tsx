import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/sonner";
import { DIGICRAFT_LOGO_PATH } from "@/lib/branding";
import {
    DEFAULT_DESCRIPTION,
    getSiteUrl,
    SITE_NAME,
} from "@/lib/site";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL(getSiteUrl()),
    title: {
        default: SITE_NAME,
        template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    robots: { index: true, follow: true },
    icons: {
        icon: [{ url: DIGICRAFT_LOGO_PATH, type: "image/png" }],
        apple: DIGICRAFT_LOGO_PATH,
    },
    openGraph: {
        title: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
        url: getSiteUrl(),
        siteName: SITE_NAME,
        locale: "en_IN",
        type: "website",
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
        title: SITE_NAME,
        description: DEFAULT_DESCRIPTION,
    },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} min-h-screen antialiased`}>
                <Providers>
                    {children}
                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
