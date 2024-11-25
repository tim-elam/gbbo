import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createTable('races')
    .addColumn('id', 'uuid', col =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('title', 'text', col =>
      col.notNull())
    .addColumn('slug', 'text', col =>
      col.unique().notNull())
    .addColumn('date', 'date', col =>
      col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('races')
    .execute();
}
