"use client";

import { useLocale } from "@/lib/LocaleContext";
import { Locale } from "@/lib/translations";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const localeOptions: { value: Locale; label: string; flag: string }[] = [
    { value: "ru", label: "RU", flag: "🇷🇺" },
    { value: "uk", label: "UA", flag: "🇺🇦" },
    { value: "en", label: "EN", flag: "🇬🇧" },
];

export default function LanguageSelector() {
    const { locale, setLocale } = useLocale();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const current = localeOptions.find((o) => o.value === locale)!;

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-1 px-2 py-1 rounded-lg border border-gray-700 hover:border-neon-green/50 transition-colors text-xs text-gray-300 hover:text-white"
            >
                <span>{current.flag}</span>
                <span className="hidden sm:inline">{current.label}</span>
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-1 bg-black/95 border border-neon-green/30 rounded-lg overflow-hidden z-50 shadow-lg shadow-neon-green/10 min-w-[100px]">
                    {localeOptions.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => {
                                setLocale(opt.value);
                                setOpen(false);
                            }}
                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${locale === opt.value
                                    ? "bg-neon-green/20 text-neon-green"
                                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                                }`}
                        >
                            <span>{opt.flag}</span>
                            <span>{opt.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
