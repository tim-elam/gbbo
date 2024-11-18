import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('series')
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo('now()').notNull())
    .addColumn('updated_at', 'timestamp', (col) => col.defaultTo('now()').notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('series')
    .dropColumn('created_at')
    .dropColumn('updated_at')
    .execute();
}
