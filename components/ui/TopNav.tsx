"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, User } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
    { href: "/", icon: Home, label: "Главная" },
    { href: "/history", icon: Clock, label: "История" },
    { href: "/settings", icon: User, label: "Профиль" },
];

export default function TopNav() {
    const pathname = usePathname();

    return (
        <nav className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="relative"
                    >
                        <motion.div
                            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full transition-all ${isActive
                                ? "bg-neon-green/20 text-neon-green"
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? "drop-shadow-[0_0_8px_rgba(0,255,148,0.6)]" : ""}`} />
                            <span className="hidden sm:inline text-xs uppercase tracking-wider font-medium">
                                {item.label}
                            </span>
                        </motion.div>
                        {isActive && (
                            <motion.div
                                layoutId="nav-indicator"
                                className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-neon-green rounded-full"
                                initial={false}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}
                    </Link>
                );
            })}
        </nav>
    );
}
