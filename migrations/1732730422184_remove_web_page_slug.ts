import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('web_pages')
    .dropColumn('slug')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('web_pages')
    .addColumn('slug', 'text', col =>
      col.notNull())
    .execute();
}
