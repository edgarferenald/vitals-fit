import CalorieWidget from "@/components/dashboard/CalorieWidget";
import StreakWidget from "@/components/dashboard/StreakWidget";
import WaterWidget from "@/components/dashboard/WaterWidget";
import NeonButton from "@/components/ui/NeonButton";
import FoodScanner from "@/components/scanner/FoodScanner";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 pb-24 min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-widest">
            VITALS
            <span className="text-neon-green text-xs sm:text-sm ml-2 align-top">V1.0</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">Система в сети • Био-синхронизация</p>
        </div>
        <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-tr from-neon-green via-neon-blue to-neon-pink p-[2px]">
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xs sm:text-sm font-bold text-white">
            USER
          </div>
        </div>
      </header>

      {/* Main Dashboard Grid - Responsive */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Left Column - Streak (full width on mobile, 1 col on desktop) */}
        <section className="lg:col-span-1">
          <StreakWidget days={12} />
        </section>

        {/* Center Column - Water & Calories (stacked on mobile, 1 col on desktop) */}
        <section className="lg:col-span-1 flex flex-col gap-4">
          <WaterWidget />
          <CalorieWidget calories={1250} />
        </section>

        {/* Right Column - Food Scanner (full width on mobile, 1 col on desktop) */}
        <section className="lg:col-span-1">
          <div className="h-full p-6 rounded-2xl border border-neon-green/30 bg-neon-green/5 flex flex-col items-center justify-center gap-4 min-h-[200px]">
            <div className="text-center">
              <span className="block text-xl sm:text-2xl text-white font-bold uppercase tracking-wider">Сканер Еды</span>
              <span className="text-sm text-neon-green">AI Анализ Готов</span>
            </div>
            <FoodScanner />
          </div>
        </section>
      </div>

      {/* Decorative Scanner Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 255, 148, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 148, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}>
      </div>
    </div>
  );
}
