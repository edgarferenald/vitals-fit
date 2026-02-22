"use client";

import CalorieWidget from "@/components/dashboard/CalorieWidget";
import StreakWidget from "@/components/dashboard/StreakWidget";
import WaterWidget from "@/components/dashboard/WaterWidget";
import FoodScanner from "@/components/scanner/FoodScanner";
import Header from "@/components/ui/Header";

export default function Home() {
  return (
    <div className="flex flex-col gap-3 p-3 sm:p-6 h-full overflow-auto pb-6">
      <Header />

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
