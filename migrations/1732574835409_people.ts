import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createTable('people')
    .addColumn('id', 'uuid', col =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('first_name', 'text', col =>
      col.notNull())
    .addColumn('last_name', 'text', col =>
      col.notNull())
    .addColumn('slug', 'text', col =>
      col.unique().notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('people')
    .execute();
}
