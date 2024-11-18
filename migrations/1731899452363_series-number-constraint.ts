import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('series')
    .addUniqueConstraint('unique_series_number', ['series_number'])
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('series')
    .dropConstraint('unique_series_number')
    .execute();
}
