import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await sql`
      ALTER TABLE people
          ADD COLUMN fts tsvector generated always as (to_tsvector('english', immutable_unaccent(first_name) || ' ' ||
                                                                              immutable_unaccent(last_name))) stored;
  `.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await sql`ALTER TABLE people DROP COLUMN IF EXISTS fts`.execute(db);
}
