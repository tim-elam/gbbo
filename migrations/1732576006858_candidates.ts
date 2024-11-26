import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('candidates')
    .addColumn('person_id', 'uuid', (col) =>
      col.notNull().references('people.id').onDelete('cascade')
    )
    .addColumn('race_id', 'uuid', (col) =>
      col.notNull().references('races.id').onDelete('cascade')
    )
    .addUniqueConstraint('unique_person_race', ['person_id', 'race_id'])
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('candidates').execute();
}
