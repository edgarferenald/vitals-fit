"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { motion } from "framer-motion";

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { signIn, signUp } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { error } = isLogin
            ? await signIn(email, password)
            : await signUp(email, password);

        if (error) {
            setError(error.message);
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
                {isLogin ? "Вход" : "Регистрация"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-black/50 border border-neon-green/30 text-white focus:outline-none focus:border-neon-green transition-colors"
                        placeholder="your@email.com"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-1">Пароль</label>
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

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-lg bg-neon-green text-black font-bold uppercase tracking-wider hover:bg-neon-green/80 transition-colors disabled:opacity-50"
                >
                    {loading ? "Загрузка..." : isLogin ? "Войти" : "Создать аккаунт"}
                </button>
            </form>

            <p className="text-center text-gray-400 mt-4 text-sm">
                {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-neon-green hover:underline"
                >
                    {isLogin ? "Регистрация" : "Войти"}
                </button>
            </p>
        </motion.div>
    );
}
