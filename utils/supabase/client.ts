import { createBrowserClient } from '@supabase/ssr';

const {
  SUPABASE_ANON_KEY,
  SUPABASE_URL,
} = process.env;


export function createClient() {
  return createBrowserClient(
    SUPABASE_URL!,
    SUPABASE_ANON_KEY!,
  );
}
