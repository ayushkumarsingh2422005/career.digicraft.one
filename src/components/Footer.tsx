"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    FaGithub,
    FaLinkedinIn,
    FaInstagram,
    FaWhatsapp,
    FaEnvelope,
} from "react-icons/fa";

const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Open Roles", path: "/jobs" },
    { name: "Culture", path: "/culture" },
    { name: "DigiCraft Main", path: "https://digicraft.one" },
    { name: "Marketplace", path: "https://marketplace.digicraft.one" },
    { name: "Contact", path: "https://digicraft.one/contact" },
];

const perks = [
    "Competitive compensation",
    "Remote-friendly culture",
    "Learning & growth budget",
    "Flexible work hours",
    "Cutting-edge projects",
    "Collaborative team",
];

export default function Footer() {
    return (
        <footer className="relative mt-20 overflow-hidden border-t border-white/5 pt-20 pb-12">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/20 to-[#050810]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.06)_0%,transparent_70%)]" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <Link href="/" className="mb-6 block text-2xl font-bold">
                            <span className="text-violet-400">Digi</span>
                            <span className="text-slate-100">Craft</span>{" "}
                            <span className="text-base font-normal text-teal-400/80">
                                Careers
                            </span>
                        </Link>
                        <p className="mb-4 text-slate-400">
                            Join us in crafting digital experiences that inspire,
                            innovate, and impact.
                        </p>
                        <p className="text-sm text-slate-500">
                            DigiCraft Innovation Private Limited
                        </p>
                    </div>

                    <div>
                        <h3 className="mb-6 text-lg font-semibold text-slate-100">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {quickLinks.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.path}
                                        className="text-slate-400 transition-colors hover:text-teal-300"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-6 text-lg font-semibold text-slate-100">
                            Why Join Us
                        </h3>
                        <ul className="space-y-3">
                            {perks.map((perk) => (
                                <li
                                    key={perk}
                                    className="flex items-center gap-2 text-slate-400"
                                >
                                    <span className="text-teal-400">✓</span>
                                    {perk}
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 flex space-x-4">
                            {[
                                {
                                    href: "https://github.com/digicraft-one",
                                    icon: FaGithub,
                                },
                                {
                                    href: "https://www.linkedin.com/company/digicraft-tech",
                                    icon: FaLinkedinIn,
                                },
                                {
                                    href: "https://www.instagram.com/digicraft_technologies",
                                    icon: FaInstagram,
                                },
                                {
                                    href: "https://api.whatsapp.com/send/?phone=%2B918299797516",
                                    icon: FaWhatsapp,
                                },
                                {
                                    href: "mailto:hello@digicraft.one",
                                    icon: FaEnvelope,
                                },
                            ].map(({ href, icon: Icon }) => (
                                <motion.a
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -3 }}
                                    className="text-slate-500 transition-colors hover:text-teal-300"
                                >
                                    <Icon size={22} />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mb-8 h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />

                <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">
                    <p>
                        © {new Date().getFullYear()} DigiCraft Innovation Private
                        Limited. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <a
                            href="https://digicraft.one/privacy-policy"
                            className="transition-colors hover:text-teal-300"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="https://digicraft.one/terms"
                            className="transition-colors hover:text-teal-300"
                        >
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
