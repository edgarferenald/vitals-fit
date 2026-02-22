"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Camera, Clock, BookOpen, Settings } from "lucide-react";
import { useLocale } from "@/lib/LocaleContext";

const navItems = [
    { href: "/", icon: Home, labelKey: "nav.dashboard", width: "w-[85px] sm:w-[95px]" },
    { href: "/history", icon: Clock, labelKey: "nav.history", width: "w-[80px] sm:w-[90px]" },
    { href: "/recommendations", icon: BookOpen, labelKey: "nav.recommendations", width: "w-[85px] sm:w-[95px]" },
    { href: "/settings", icon: Settings, labelKey: "nav.settings", width: "w-[80px] sm:w-[90px]" },
];

export default function TopNav() {
    const pathname = usePathname();
    const { t } = useLocale();

    return (
        <nav className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full transition-all ${item.width} ${isActive
                            ? "bg-neon-green/20 text-neon-green border border-neon-green/30"
                            : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                            }`}
                    >
                        <Icon className={`w-4 h-4 sm:w-4 sm:h-4 flex-shrink-0 ${isActive ? "drop-shadow-[0_0_8px_rgba(0,255,148,0.6)]" : ""}`} />
                        <span className="hidden sm:inline text-[10px] uppercase tracking-wider font-medium whitespace-nowrap">
                            {t(item.labelKey)}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}
