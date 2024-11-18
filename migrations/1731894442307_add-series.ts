import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema.createTable('series')
    .addColumn('id', 'uuid', col =>
      col.defaultTo(sql`gen_random_uuid()`))
    .addColumn('series_number', 'integer')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('series')
    .execute();
}
