"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, History, Settings } from "lucide-react";

const navItems = [
    { href: "/", icon: Home, label: "Главная" },
    { href: "/history", icon: History, label: "История" },
    { href: "/settings", icon: Settings, label: "Настройки" },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-neon-green/20 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-around items-center h-16">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${isActive
                                        ? "text-neon-green"
                                        : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? "drop-shadow-[0_0_8px_rgba(0,255,148,0.5)]" : ""}`} />
                                <span className="text-[10px] uppercase tracking-wider">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
