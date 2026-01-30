import CalorieWidget from "@/components/dashboard/CalorieWidget";
import StreakWidget from "@/components/dashboard/StreakWidget";
import WaterWidget from "@/components/dashboard/WaterWidget";
import NeonButton from "@/components/ui/NeonButton";
import FoodScanner from "@/components/scanner/FoodScanner";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 p-6 pb-24 min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-widest">
            VITALS
            <span className="text-neon-green text-xs ml-1 align-top">V1.0</span>
          </h1>
          <p className="text-xs text-gray-400">Система в сети • Био-синхронизация</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-neon-green via-neon-blue to-neon-pink p-[2px]">
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xs font-bold text-white">
            USER
          </div>
        </div>
      </header>

      {/* Streak Section */}
      <section>
        <StreakWidget days={12} />
      </section>

      {/* Main Trackers Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WaterWidget />
        <CalorieWidget calories={1250} />
      </section>

      {/* Action Area */}
      <section className="mt-4">
        <div className="p-4 rounded-2xl border border-neon-green/30 bg-neon-green/5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-white font-bold uppercase tracking-wider">Сканер Еды</span>
            <span className="text-xs text-neon-green">AI Анализ Готов</span>
          </div>
          <FoodScanner />
        </div>
      </section>

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
