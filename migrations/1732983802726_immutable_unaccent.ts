import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await sql`
		CREATE OR REPLACE FUNCTION immutable_unaccent(text)
			RETURNS text
		AS $$
		BEGIN
			RETURN unaccent($1);
		END;
		$$ LANGUAGE plpgsql IMMUTABLE;
`.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
	await sql`
      DROP FUNCTION IF EXISTS immutable_unaccent;
  `.execute(db);
}
