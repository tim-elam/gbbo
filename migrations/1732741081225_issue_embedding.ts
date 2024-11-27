import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('issues')
    .addColumn('embedding', sql`vector(1536)`)
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('issues').dropColumn('embedding').execute();
}
