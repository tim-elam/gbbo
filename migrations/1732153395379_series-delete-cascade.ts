import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('bakers')
    .addColumn('series_number_2', 'integer')
    .execute();

  await db.updateTable('bakers')
    .set(eb => ({
      series_number_2: eb.ref('series_number'),
    }))
    .execute();

  await db.schema.alterTable('bakers')
    .dropColumn('series_number')
    .execute();

  await db.schema.alterTable('bakers')
    .addColumn('series_number', 'integer', col =>
      col.references('series.series_number').onDelete('cascade'))
    .execute();

  await db.updateTable('bakers')
    .set(eb => ({
      series_number: eb.ref('series_number_2'),
    }))
    .execute();

  await db.schema.alterTable('bakers')
    .dropColumn('series_number_2')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
}
