import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Singleton pattern - create client once
let supabaseInstance: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
    if (supabaseInstance) {
        return supabaseInstance;
    }

    // During SSR/build, use placeholder if env vars missing
    if (!supabaseUrl || !supabaseKey) {
        if (typeof window !== 'undefined') {
            console.error("Supabase URL or Anon Key is missing!");
        }
        return createClient('https://placeholder.supabase.co', 'placeholder-key');
    }

    supabaseInstance = createClient(supabaseUrl, supabaseKey, {
        auth: {
            persistSession: true,
            storageKey: 'vitals-auth',
            autoRefreshToken: true,
            detectSessionInUrl: true,
            // WORKAROUND FOR SUPABASE + REACT 19 STRICT MODE BUG
            // "AbortError: signal is aborted without reason"
            // The browser's Web Locks API freezes when unmounted mid-operation
            // Providing a dummy lock bypasses this issue entirely
            lock: async (name: string, acquireTimeout: number, fn: () => Promise<any>) => {
                return await fn();
            }
        }
    });

    return supabaseInstance;
}

// Export the client getter
export const supabase = getSupabaseClient();

// For cases where we need a fresh reference
export const getSupabase = getSupabaseClient;
