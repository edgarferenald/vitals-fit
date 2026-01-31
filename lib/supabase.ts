import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a lazy-initialized client to avoid build-time errors
let _supabase: SupabaseClient | null = null;

export const getSupabase = (): SupabaseClient => {
    if (!_supabase) {
        if (!supabaseUrl || !supabaseKey) {
            console.warn("Supabase URL or Anon Key is missing. Check your .env.local file.");
            // Return a dummy client for build time - it won't be used for actual operations
            return createClient('https://placeholder.supabase.co', 'placeholder');
        }
        _supabase = createClient(supabaseUrl, supabaseKey);
    }
    return _supabase;
};

// For backwards compatibility - lazy getter
export const supabase = {
    get from() {
        return getSupabase().from.bind(getSupabase());
    },
    get auth() {
        return getSupabase().auth;
    }
};
