"use client";

import Footer from "@/components/Footer";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

interface PageShellProps {
    children: ReactNode;
    noTopPadding?: boolean;
    showFooter?: boolean;
}

/** Inner pages — no flowing bubbles (those live only in CareerHero on home). */
export default function PageShell({
    children,
    noTopPadding = false,
    showFooter = true,
}: PageShellProps) {
    return (
        <main className="relative min-h-screen overflow-x-hidden">
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,0.04)_0%,transparent_50%)]" />
            <GridBackground />

            <div className="relative z-10">
                <Navbar />
                <div className={noTopPadding ? "" : "pt-28 md:pt-32"}>
                    {children}
                </div>
                {showFooter && <Footer />}
            </div>
        </main>
    );
}
