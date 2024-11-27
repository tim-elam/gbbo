import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createTable('web_page_chunks')
    .addColumn('web_page_id', 'uuid', col =>
      col.references('web_pages.id').onUpdate('cascade').onDelete('cascade'))
    .addColumn('content', 'text', col =>
      col.notNull())
    .addColumn('from_line', 'integer', col =>
      col.notNull())
    .addColumn('to_line', 'integer', col =>
      col.notNull())
    .addColumn('embedding', sql`vector(1536)`, col =>
      col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('web_page_chunks').execute();
}
