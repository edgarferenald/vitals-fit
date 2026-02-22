"use client";

import Link from "next/link";
import TopNav from "./TopNav";
import LanguageSelector from "./LanguageSelector";
import { useAuth } from "@/lib/AuthContext";
import { useLocale } from "@/lib/LocaleContext";

export default function Header() {
    const { user, profile } = useAuth();
    const { t } = useLocale();

    const displayName = profile?.display_name || user?.email?.split('@')[0] || "USER";
    const avatarText = profile?.display_name
        ? profile.display_name.charAt(0).toUpperCase()
        : user?.email?.charAt(0).toUpperCase() || "U";

    return (
        <>
            <header className="flex items-center justify-between gap-2">
                {/* Logo - Clickable */}
                <Link href="/" className="flex-shrink-0">
                    <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white tracking-widest hover:text-neon-green transition-colors">
                        VITALS
                        <span className="text-neon-green text-[8px] sm:text-xs ml-0.5 align-top">v1</span>
                    </h1>
                </Link>

                {/* Center Navigation */}
                <TopNav />

                {/* Right Controls */}
                <div className="flex items-center gap-2">
                    <LanguageSelector />
                    <Link href="/settings" className="group flex-shrink-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-neon-green via-neon-blue to-neon-pink p-[1.5px] group-hover:shadow-[0_0_15px_rgba(0,255,148,0.5)] transition-shadow">
                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] sm:text-xs font-bold text-white">
                                {avatarText}
                            </div>
                        </div>
                    </Link>
                </div>
            </header>

            {/* Status Line */}
            <p className="text-[9px] sm:text-xs text-gray-500 -mt-2">{t("header.status")} • {displayName}</p>
        </>
    );
}
