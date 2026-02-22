"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { useLocale } from "@/lib/LocaleContext";
import { motion } from "framer-motion";

export default function AuthForm() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const { t } = useLocale();

    const { signIn, signUp } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccessMsg("");

        if (isLogin) {
            const { error } = await signIn(email, password);
            if (error) {
                setError(error.message);
            } else {
                router.push("/");
            }
        } else {
            const { error, needsConfirmation } = await signUp(email, password);
            if (error) {
                setError(error.message);
            } else if (needsConfirmation) {
                // Supabase email confirmation is ON — tell user to check email
                setSuccessMsg(
                    t("auth.checkEmail") ||
                    "✅ Регистрация прошла! Проверьте почту и подтвердите email, затем войдите."
                );
                setIsLogin(true);
            } else {
                // Email confirmation is OFF — user is logged in immediately
                router.push("/");
            }
        }

        setLoading(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm mx-auto p-6 rounded-2xl bg-black/50 border border-neon-green/30 backdrop-blur-lg"
        >
            <h2 className="text-2xl font-bold text-center text-white mb-6">
                {isLogin ? t("auth.login") : t("auth.register")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-1">{t("auth.email")}</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-neon-green/30 text-white focus:outline-none focus:border-neon-green transition-colors"
                        placeholder={t("auth.emailPlaceholder")}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">{t("auth.password")}</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-neon-green/30 text-white focus:outline-none focus:border-neon-green transition-colors"
                        placeholder="••••••••"
                        required
                        minLength={6}
                    />
                </div>

                {error && (
                    <p className="text-red-400 text-sm text-center">{error}</p>
                )}

                {successMsg && (
                    <p className="text-neon-green text-sm text-center p-3 rounded-lg bg-neon-green/10 border border-neon-green/30">
                        {successMsg}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-lg bg-neon-green text-black font-bold uppercase tracking-wider hover:bg-neon-green/80 transition-colors disabled:opacity-50"
                >
                    {loading ? t("auth.loading") : isLogin ? t("auth.submit.login") : t("auth.submit.register")}
                </button>
            </form>

            <p className="text-center text-gray-400 mt-4 text-sm">
                {isLogin ? t("auth.noAccount") : t("auth.hasAccount")}{" "}
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-neon-green hover:underline"
                >
                    {isLogin ? t("auth.register") : t("auth.submit.login")}
                </button>
            </p>
        </motion.div>
    );
}
