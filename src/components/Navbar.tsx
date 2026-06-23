"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronDownIcon } from "lucide-react";

const navItems = [
    { name: "Home", path: "/" },
    { name: "Open Roles", path: "/jobs" },
    { name: "Culture", path: "/culture" },
];

const productDropdownItems = [
    {
        name: "DigiCraft",
        href: "https://digicraft.one",
        logo: "/logo.svg",
    },
    {
        name: "Marketplace",
        href: "https://marketplace.digicraft.one",
        logo: "https://marketplace.digicraft.one/logo.svg",
    },
    {
        name: "Media",
        href: "https://media.digicraft.one",
        logo: "https://media.digicraft.one/logo.svg",
    },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const productButtonRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isMounted]);

    useEffect(() => {
        if (!isMounted) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (
                productButtonRef.current &&
                !productButtonRef.current.contains(event.target as Node) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isMounted]);

    const isActive = (path: string) => {
        if (path === "/") return pathname === "/";
        return pathname.startsWith(path);
    };

    const linkClass = (path: string) =>
        `relative group transition-colors ${
            isActive(path)
                ? "text-teal-300"
                : "text-slate-300 hover:text-white"
        }`;

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed w-full z-50 transition-all duration-300 ${
                isScrolled
                    ? "border-b border-white/5 bg-[#080c14]/90 py-2 backdrop-blur-xl"
                    : "bg-transparent py-5"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/logo.svg"
                                alt="DigiCraft Careers"
                                width={52}
                                height={52}
                                className="h-12 w-auto"
                                priority
                            />
                            <span className="hidden sm:block text-sm font-semibold tracking-wide">
                                <span className="text-violet-400">Careers</span>
                            </span>
                        </Link>
                        <div className="relative">
                            <div
                                onClick={() =>
                                    isMounted &&
                                    setIsDropdownOpen((prev) => !prev)
                                }
                                ref={productButtonRef}
                            >
                                <button
                                    title="DigiCraft Products"
                                    className="hidden md:flex items-center justify-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 backdrop-blur-sm transition-all hover:border-teal-400/30 hover:bg-white/10"
                                >
                                    Products{" "}
                                    <ChevronDownIcon
                                        className={`h-4 w-4 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                                    />
                                </button>
                            </div>
                            {isMounted && isDropdownOpen && (
                                <div
                                    ref={dropdownRef}
                                    className="absolute left-0 z-50 mt-2 w-48 rounded-xl border border-white/10 bg-[#0f1520]/95 shadow-xl backdrop-blur-xl"
                                >
                                    <ul className="py-1">
                                        {productDropdownItems.map((item) => (
                                            <li key={item.name}>
                                                <a
                                                    href={item.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mx-1 flex items-center gap-2 rounded-lg px-3 py-2 text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                                                    onClick={() =>
                                                        setIsDropdownOpen(false)
                                                    }
                                                >
                                                    <Image
                                                        src={item.logo}
                                                        alt={item.name}
                                                        width={20}
                                                        height={20}
                                                        className="h-5 w-5 object-contain"
                                                    />
                                                    <span className="text-sm font-medium">
                                                        {item.name}
                                                    </span>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={linkClass(item.path)}
                            >
                                {item.name}
                                <span
                                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-violet-500 to-teal-400 transition-all duration-300 ${
                                        isActive(item.path)
                                            ? "w-full"
                                            : "w-0 group-hover:w-full"
                                    }`}
                                />
                            </Link>
                        ))}
                        <button
                            onClick={() => router.push("/jobs")}
                            className="career-btn-primary !px-5 !py-2 text-sm"
                        >
                            View Open Roles
                        </button>
                    </div>

                    <button
                        className="lg:hidden p-2 focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        <div
                            className={`mb-1.5 h-0.5 w-6 bg-slate-200 transition-all ${
                                isOpen
                                    ? "translate-y-2 rotate-45"
                                    : ""
                            }`}
                        />
                        <div
                            className={`mb-1.5 h-0.5 w-6 bg-slate-200 transition-all ${
                                isOpen ? "opacity-0" : ""
                            }`}
                        />
                        <div
                            className={`h-0.5 w-6 bg-slate-200 transition-all ${
                                isOpen
                                    ? "-translate-y-2 -rotate-45"
                                    : ""
                            }`}
                        />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-white/5 bg-[#0f1520]/95 backdrop-blur-xl lg:hidden"
                    >
                        <div className="space-y-1 px-4 py-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block rounded-lg px-3 py-2.5 ${linkClass(item.path)}`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    router.push("/jobs");
                                }}
                                className="mt-2 w-full career-btn-primary"
                            >
                                View Open Roles
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
