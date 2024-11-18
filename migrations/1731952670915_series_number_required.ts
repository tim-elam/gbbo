import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('bakers')
    .alterColumn('series_number', col => col.setNotNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('bakers')
    .alterColumn('series_number', col => col.dropNotNull())
    .execute();
}
