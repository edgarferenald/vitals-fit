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
            detectSessionInUrl: true
        },
        global: {
            // Workaround for "AbortError: signal is aborted without reason"
            // Supabase v2 internally calls cancelQueries() on token refresh,
            // which aborts all pending requests via AbortSignal.
            // Removing signal prevents operations (addWater, startStreak, etc.)
            // from being silently cancelled during automatic session refresh.
            fetch: (input: RequestInfo | URL, init?: RequestInit) => {
                if (init) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { signal, ...rest } = init;
                    return fetch(input, rest);
                }
                return fetch(input, init);
            }
        }
    });

    return supabaseInstance;
}

// Export the client getter
export const supabase = getSupabaseClient();

// For cases where we need a fresh reference
export const getSupabase = getSupabaseClient;
