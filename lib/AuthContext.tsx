"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { User, Session } from "@supabase/supabase-js";

interface UserProfile {
    id: string;
    email: string | null;
    display_name: string | null;
    water_goal_ml: number;
    calorie_goal: number;
    streak_count: number;
}

interface AuthContextType {
    user: User | null;
    profile: UserProfile | null;
    session: Session | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
    signUp: (email: string, password: string) => Promise<{ error: Error | null; needsConfirmation: boolean }>;
    signOut: () => Promise<void>;
    updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    // userEmail passed directly from session to avoid stale React state
    const fetchProfile = async (userId: string, userEmail?: string | null) => {
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", userId)
            .single();

        if (error) {
            console.error("Error fetching profile:", error);
            // Profile might not exist yet (no trigger), create it
            if (error.code === "PGRST116") {
                const { data: newProfile, error: insertError } = await supabase
                    .from("users")
                    .insert({ id: userId, email: userEmail ?? null })
                    .select()
                    .single();

                if (!insertError && newProfile) {
                    setProfile(newProfile as UserProfile);
                } else if (insertError) {
                    console.error("Error creating profile:", insertError);
                }
            }
            return;
        }

        setProfile(data as UserProfile);
    };

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession()
            .then(({ data: { session } }) => {
                setSession(session);
                setUser(session?.user ?? null);
                if (session?.user) {
                    fetchProfile(session.user.id, session.user.email);
                }
                setLoading(false);
            })
            .catch((err) => {
                // If Supabase is unreachable (bad env vars, network error),
                // always unblock the UI — show "not logged in" state
                console.error("Supabase getSession error:", err);
                setLoading(false);
            });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setSession(session);
                setUser(session?.user ?? null);

                if (session?.user) {
                    await fetchProfile(session.user.id, session.user.email);
                } else {
                    setProfile(null);
                }

                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const signIn = async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        return { error };
    };

    const signUp = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        // needsConfirmation = registered OK but no active session (email confirmation required)
        const needsConfirmation = !error && !!data.user && !data.session;
        return { error, needsConfirmation };
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setProfile(null);
        setSession(null);
    };

    const updateProfile = async (updates: Partial<UserProfile>) => {
        if (!user) return;

        const { error } = await supabase
            .from("users")
            .update(updates)
            .eq("id", user.id);

        if (!error) {
            // Re-fetch from DB to ensure React state matches what was actually saved
            await fetchProfile(user.id, user.email);
        } else {
            console.error("Error updating profile:", error);
        }
    };

    const refreshProfile = async () => {
        if (user) {
            await fetchProfile(user.id, user.email);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            profile,
            session,
            loading,
            signIn,
            signUp,
            signOut,
            updateProfile,
            refreshProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
