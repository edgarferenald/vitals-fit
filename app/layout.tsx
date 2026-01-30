import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google"; // Import Google fonts via Next.js
import "./globals.css";

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
    <html lang="en">
      <body
        className={`${inter.variable} ${orbitron.variable} antialiased cyber-bg min-h-screen text-white`}
      >
        <main className="relative z-10 max-w-md mx-auto min-h-screen flex flex-col">
          {/* Mobile-first container max-w-md to simulate app on desktop */}
          {children}
        </main>

        {/* Background ambient glow effects */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-neon-green/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-blue/5 rounded-full blur-[100px]" />
        </div>
      </body>
    </html>
  );
}
