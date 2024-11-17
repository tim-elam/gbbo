import { defineConfig } from 'kysely-ctl';
import { Resource } from 'sst';
import { PostgresDialect } from 'kysely';
import { Pool } from 'pg';

export default defineConfig({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: Resource.DatabaseUrl.value,
      ssl: {
        ca: Resource.SupabaseCert.value,
        rejectUnauthorized: false,
      },
    }),
  }),
});
