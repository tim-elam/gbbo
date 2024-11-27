import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('web_pages')
    .dropConstraint('web_pages_pk')
    .execute();
  await db.schema.alterTable('web_pages')
    .addColumn('id', 'uuid', col =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('web_pages')
    .dropColumn('id')
    .execute();
  await db.schema.alterTable('web_pages')
    .addPrimaryKeyConstraint('web_pages_pk', ['website_origin', 'slug'])
    .execute();
}
