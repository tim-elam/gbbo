import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('positions')
    .addColumn('person_id', 'uuid', (col) =>
      col.notNull().references('people.id').onDelete('cascade')
    )
    .addColumn('issue_id', 'uuid', (col) =>
      col.notNull().references('issues.id').onDelete('cascade')
    )
    .addColumn('content', 'text', col =>
      col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('positions').execute();
}
