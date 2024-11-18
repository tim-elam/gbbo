import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createTable('bakers')
    .addColumn('id', 'uuid', col =>
      col.defaultTo(sql`gen_random_uuid()`))
    .addColumn('series_number', 'integer', col =>
      col.references('series.series_number'))
    .addColumn('name', 'text', col => col.notNull())
    .addColumn('description', 'text')
    .addUniqueConstraint('unique_name_series_number', ['name', 'series_number'])
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('bakers')
    .execute();
}
