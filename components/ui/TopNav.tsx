"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, User } from "lucide-react";

const navItems = [
    { href: "/", icon: Home, label: "Главная", width: "w-[90px] sm:w-[100px]" },
    { href: "/history", icon: Clock, label: "История", width: "w-[85px] sm:w-[95px]" },
    { href: "/settings", icon: User, label: "Профиль", width: "w-[85px] sm:w-[95px]" },
];

export default function TopNav() {
    const pathname = usePathname();

    return (
        <nav className="flex items-center gap-0.5 sm:gap-1">
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
                            {item.label}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}
