"use client";

import { useState } from "react";
import CalorieWidget from "@/components/dashboard/CalorieWidget";
import StreakWidget from "@/components/dashboard/StreakWidget";
import WaterWidget from "@/components/dashboard/WaterWidget";
import ProgressChart from "@/components/dashboard/ProgressChart";
import StreakCalendar from "@/components/dashboard/StreakCalendar";
import AIDailyAnalysis from "@/components/dashboard/AIDailyAnalysis";
import FoodScanner from "@/components/scanner/FoodScanner";
import Header from "@/components/ui/Header";
import PageTransition from "@/components/ui/PageTransition";
import OnboardingWizard from "@/components/ui/OnboardingWizard";
import { useAuth } from "@/lib/AuthContext";
import { useLocale } from "@/lib/LocaleContext";

export default function Home() {
  const { user, profile, refreshProfile } = useAuth();
  const { t } = useLocale();
  const [onboardingDone, setOnboardingDone] = useState(false);

  // Show onboarding if user is logged in but hasn't completed it
  const showOnboarding = user && profile && !profile.onboarding_completed && !onboardingDone;

  if (showOnboarding) {
    return (
      <PageTransition>
        <OnboardingWizard onComplete={() => {
          setOnboardingDone(true);
          refreshProfile();
        }} />
      </PageTransition>
    );
  }

  return (
    <PageTransition className="flex flex-col gap-4 p-4 sm:p-6 lg:p-8 h-full overflow-auto pb-8">
      <Header />

      {/* Main Dashboard */}
      <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">

        {/* Top 3 Widgets - Equal Height */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 auto-rows-fr">
          <StreakWidget />
          <WaterWidget />
          <CalorieWidget />
        </div>

        {/* Food Scanner - Right under Calories */}
        <div className="p-6 sm:p-8 rounded-2xl border border-neon-green/30 bg-neon-green/5 flex flex-col items-center justify-center gap-4 sm:gap-5">
          <div className="text-center">
            <span className="block text-lg sm:text-2xl lg:text-3xl text-white font-bold uppercase tracking-wider">{t("scanner.title")}</span>
            <span className="text-sm sm:text-base text-neon-green">{t("scanner.ready")}</span>
          </div>
          <FoodScanner />
        </div>

        {/* Progress Chart */}
        <ProgressChart />

        {/* Streak Calendar */}
        <StreakCalendar />

        {/* AI Daily Analysis - At the very bottom */}
        <AIDailyAnalysis />
      </div>

      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 255, 148, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 148, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}>
      </div>
    </PageTransition>
  );
}
