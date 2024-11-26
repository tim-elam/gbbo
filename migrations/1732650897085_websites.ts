import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createTable('websites')
    .addColumn('id', 'uuid', col =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn('person_id', 'uuid', col =>
      col.notNull().references('people.id'))
    .addColumn('title', 'varchar(255)', col =>
      col.unique().notNull())
    .addColumn('slug', 'varchar(255)', col =>
      col.unique().notNull())
    .addColumn('origin', 'varchar(255)', col =>
      col.unique().notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('websites').execute();
}
