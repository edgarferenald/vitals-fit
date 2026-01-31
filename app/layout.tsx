import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import BottomNav from "@/components/ui/BottomNav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata: Metadata = {
  title: "Vitals | Cyberpunk Fitness",
  description: "Biohacking & Fitness Tracking Powered by AI",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.variable} ${orbitron.variable} antialiased cyber-bg min-h-screen text-white`}
      >
        <AuthProvider>
          <main className="relative z-10 w-full max-w-7xl mx-auto min-h-screen flex flex-col px-4 sm:px-6 lg:px-8 pb-20">
            {children}
          </main>
          <BottomNav />
        </AuthProvider>

        {/* Background ambient glow effects */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-green/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-blue/5 rounded-full blur-[100px]" />
        </div>
      </body>
    </html>
  );
}
