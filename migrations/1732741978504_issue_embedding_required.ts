import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await sql`ALTER TABLE issues ALTER COLUMN embedding SET NOT NULL`.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await sql`ALTER TABLE issues ALTER COLUMN embedding DROP NOT NULL`.execute(db);
}
