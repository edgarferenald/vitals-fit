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

    return (
        <>
            <header className="flex items-center justify-between gap-2">
                {/* Logo - Clickable */}
                <Link href="/" className="flex-shrink-0">
                    <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white tracking-widest hover:text-neon-green transition-colors">
                        VITALS
                        <span className="text-neon-green text-[8px] sm:text-xs ml-0.5 align-top">v2</span>
                    </h1>
                </Link>

                {/* Center Navigation */}
                <TopNav />

                {/* Right Controls */}
                <div className="flex items-center gap-2">
                    <LanguageSelector />
                    <Link href="/settings" className="group flex-shrink-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-neon-green/10 border border-neon-green/30 flex items-center justify-center group-hover:bg-neon-green/20 group-hover:border-neon-green transition-all shadow-[0_0_10px_rgba(0,255,148,0.1)]">
                            <span className="text-neon-green font-bold text-sm sm:text-base">
                                {displayName.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    </Link>
                </div>
            </header>

            {/* Status Line */}
            <p className="text-[9px] sm:text-xs text-gray-500 -mt-2">{t("header.status")} • {displayName}</p>
        </>
    );
}
