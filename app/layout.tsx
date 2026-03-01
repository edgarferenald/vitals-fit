import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import BottomNav from "@/components/ui/BottomNav";
import { LocaleProvider } from "@/lib/LocaleContext";

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
        {/* Dark Splash Screen */}
        <div
          id="splash-screen"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "16px",
            background: "#050505",
            transition: "opacity 0.5s ease, visibility 0.5s ease",
          }}
        >
          <div
            style={{
              fontSize: "clamp(32px, 8vw, 56px)",
              fontWeight: 900,
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: "0.15em",
              color: "#fff",
              textShadow: "0 0 20px rgba(0,255,148,0.6), 0 0 60px rgba(0,255,148,0.3)",
              animation: "splashPulse 1.5s ease-in-out infinite",
            }}
          >
            VITALS
          </div>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid rgba(0,255,148,0.2)",
              borderTop: "3px solid #00FF94",
              borderRadius: "50%",
              animation: "splashSpin 0.8s linear infinite",
            }}
          />
        </div>
        <style
          dangerouslySetInnerHTML={{
            __html: `
                            @keyframes splashPulse {
                                0%, 100% { opacity: 1; transform: scale(1); }
                                50% { opacity: 0.8; transform: scale(1.02); }
                            }
                            @keyframes splashSpin {
                                to { transform: rotate(360deg); }
                            }
                        `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                            window.addEventListener('load', function() {
                                setTimeout(function() {
                                    var s = document.getElementById('splash-screen');
                                    if (s) {
                                        s.style.opacity = '0';
                                        s.style.visibility = 'hidden';
                                        setTimeout(function() { s.remove(); }, 500);
                                    }
                                }, 600);
                            });
                        `,
          }}
        />

        <AuthProvider>
          <LocaleProvider>
            <div className="relative z-10 flex flex-col min-h-[100dvh]">
              <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col px-4 sm:px-6 lg:px-8 pb-20 sm:pb-0">
                {children}
              </main>
              <BottomNav />
            </div>
          </LocaleProvider>
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
