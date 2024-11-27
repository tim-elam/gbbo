import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createTable('web_pages')
    .addColumn('website_origin', 'varchar(255)', col =>
      col.notNull().references('websites.origin').onDelete('cascade').onUpdate('cascade'))
    .addColumn('pathname', 'text', col =>
      col.notNull())
    .addColumn('slug', 'text', col =>
      col.notNull())
    .addColumn('content', 'text')
    .addPrimaryKeyConstraint('web_pages_pk', ['website_origin', 'slug'])
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('web_pages').execute();
}
