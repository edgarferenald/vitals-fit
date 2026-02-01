"use client";

import CalorieWidget from "@/components/dashboard/CalorieWidget";
import StreakWidget from "@/components/dashboard/StreakWidget";
import WaterWidget from "@/components/dashboard/WaterWidget";
import FoodScanner from "@/components/scanner/FoodScanner";
import TopNav from "@/components/ui/TopNav";
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
    <div className="flex flex-col gap-3 p-3 sm:p-6 lg:p-8 min-h-screen overflow-auto pb-6">
      {/* Header with Navigation */}
      <header className="flex items-center justify-between gap-2">
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white tracking-widest">
            VITALS
            <span className="text-neon-green text-[8px] sm:text-xs ml-0.5 align-top">v1</span>
          </h1>
        </div>

        {/* Center Navigation */}
        <TopNav />

        {/* User Avatar */}
        <Link href="/settings" className="group flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-neon-green via-neon-blue to-neon-pink p-[1.5px] group-hover:shadow-[0_0_15px_rgba(0,255,148,0.5)] transition-shadow">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] sm:text-xs font-bold text-white">
              {avatarText}
            </div>
          </div>
        </Link>
      </header>

      {/* Status Line */}
      <p className="text-[9px] sm:text-xs text-gray-500 -mt-2">Система в сети • {displayName}</p>

      {/* Main Dashboard - Equal Height Widgets */}
      <div className="flex flex-col gap-3 sm:gap-4 lg:gap-6">

        {/* Top 3 Widgets - Equal Height */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 auto-rows-fr">
          <StreakWidget />
          <WaterWidget />
          <CalorieWidget />
        </div>

        {/* Food Scanner - Full Width */}
        <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-neon-green/30 bg-neon-green/5 flex flex-col items-center justify-center gap-3 sm:gap-4">
          <div className="text-center">
            <span className="block text-base sm:text-2xl text-white font-bold uppercase tracking-wider">Сканер Еды</span>
            <span className="text-xs sm:text-sm text-neon-green">AI Анализ Готов</span>
          </div>
          <FoodScanner />
        </div>
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
