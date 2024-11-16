import type { Database as SupabaseDatabase } from './supabase';
import type { KyselifyDatabase } from 'kysely-supabase';

export type Database = KyselifyDatabase<SupabaseDatabase>;
