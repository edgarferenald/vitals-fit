"use client";

import CalorieWidget from "@/components/dashboard/CalorieWidget";
import StreakWidget from "@/components/dashboard/StreakWidget";
import WaterWidget from "@/components/dashboard/WaterWidget";
import FoodScanner from "@/components/scanner/FoodScanner";
import { useAuth } from "@/lib/AuthContext";
import Link from "next/link";

export default function Home() {
  const { user, profile } = useAuth();

  // Get display name or first letter of email or default
  const displayName = profile?.display_name || user?.email?.split('@')[0] || "USER";
  const avatarText = profile?.display_name
    ? profile.display_name.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <div className="flex flex-col gap-3 p-3 sm:p-6 lg:p-8 min-h-screen max-h-screen overflow-hidden">
      {/* Header - Compact */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-white tracking-widest">
            VITALS
            <span className="text-neon-green text-[10px] sm:text-sm ml-1 align-top">V1.0</span>
          </h1>
          <p className="text-[10px] sm:text-sm text-gray-400">Система в сети • Био-синхронизация</p>
        </div>
        <Link href="/settings" className="group">
          <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-tr from-neon-green via-neon-blue to-neon-pink p-[2px] group-hover:shadow-[0_0_15px_rgba(0,255,148,0.5)] transition-shadow">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] sm:text-sm font-bold text-white">
              {avatarText}
            </div>
          </div>
          <p className="text-[8px] sm:text-[10px] text-center text-gray-500 mt-0.5 truncate max-w-[60px] sm:max-w-[80px]">
            {displayName}
          </p>
        </Link>
      </header>

      {/* Main Dashboard - Mobile: Single column compact, Desktop: 3-column */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6 overflow-hidden">

        {/* Streak Widget - Compact on mobile */}
        <section className="lg:col-span-1">
          <StreakWidget />
        </section>

        {/* Water & Calories - Side by side on mobile */}
        <section className="lg:col-span-1 grid grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-4">
          <WaterWidget />
          <CalorieWidget />
        </section>

        {/* Food Scanner - Compact */}
        <section className="lg:col-span-1">
          <div className="h-full p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-neon-green/30 bg-neon-green/5 flex flex-col items-center justify-center gap-2 sm:gap-4">
            <div className="text-center">
              <span className="block text-base sm:text-2xl text-white font-bold uppercase tracking-wider">Сканер Еды</span>
              <span className="text-xs sm:text-sm text-neon-green">AI Анализ Готов</span>
            </div>
            <FoodScanner />
          </div>
        </section>
      </div>

      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 255, 148, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 148, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}>
      </div>
    </div>
  );
}
