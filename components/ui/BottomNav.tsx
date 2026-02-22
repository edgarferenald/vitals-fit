"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, User, BookOpen } from "lucide-react";

export const navItems = [
    { href: "/", icon: Home, label: "Главная" },
    { href: "/recommendations", icon: BookOpen, label: "Советы" },
    { href: "/history", icon: Clock, label: "История" },
    { href: "/settings", icon: User, label: "Профиль" },
];

export default function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="sm:hidden fixed bottom-0 left-0 w-full z-50 bg-black/90 backdrop-blur-lg border-t border-neon-green/20 pb-safe">
            <div className="flex items-center justify-around w-full px-2 py-3">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center gap-1 w-[22%] transition-all ${isActive
                                    ? "text-neon-green"
                                    : "text-gray-400 hover:text-white"
                                }`}
                        >
                            <div className={`p-1.5 rounded-full transition-all ${isActive ? "bg-neon-green/20 drop-shadow-[0_0_8px_rgba(0,255,148,0.5)]" : "bg-transparent"
                                }`}>
                                <Icon className="w-5 h-5 flex-shrink-0" />
                            </div>
                            <span className={`text-[10px] font-medium tracking-wider text-center ${isActive ? "text-white" : "text-gray-500"
                                }`}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
