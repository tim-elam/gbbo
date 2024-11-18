import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import type { Database } from '@/types/database';
import { Resource } from 'sst';

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: Resource.DatabaseUrl.value,
      ssl: { ca: Resource.SupabaseCert.value },
    }),
  }),
});
