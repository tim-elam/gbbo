import type { Database as SupabaseDatabase } from './supabase';
import type { KyselifyDatabase } from 'kysely-supabase';

export type Database = KyselifyDatabase<SupabaseDatabase>;

export type TableRow<T extends keyof SupabaseDatabase['public']['Tables']> = SupabaseDatabase['public']['Tables'][T]['Row']

export type TableInsert<T extends keyof SupabaseDatabase['public']['Tables']> = SupabaseDatabase['public']['Tables'][T]['Insert']
