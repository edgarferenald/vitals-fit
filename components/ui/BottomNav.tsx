"use client";

import { usePathname } from "next/navigation";
import { Home, Clock, BookOpen, Trophy, Settings } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/lib/LocaleContext";

const navItems = [
    { href: "/", icon: Home, labelKey: "nav.dashboard" },
    { href: "/history", icon: Clock, labelKey: "nav.history" },
    { href: "/achievements", icon: Trophy, labelKey: "nav.achievements" },
    { href: "/recommendations", icon: BookOpen, labelKey: "nav.recommendations" },
    { href: "/settings", icon: Settings, labelKey: "nav.settings" },
];

export default function BottomNav() {
    const pathname = usePathname();
    const { t } = useLocale();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-black/90 backdrop-blur-lg border-t border-white/10">
            <div className="flex items-center justify-around py-2 px-1 max-w-lg mx-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-xl transition-all ${isActive
                                ? "text-neon-green"
                                : "text-gray-500 hover:text-gray-300"
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? "drop-shadow-[0_0_8px_rgba(0,255,148,0.6)]" : ""}`} />
                            <span className="text-[9px] uppercase tracking-wider font-medium">
                                {t(item.labelKey)}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
