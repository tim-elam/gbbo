import { tool } from '@langchain/core/tools';
import { db } from '@/utils/data/kysely';
import { z } from 'zod';
import { sql } from 'kysely';
import { jsonArrayFrom } from 'kysely/helpers/postgres';

export const personLookupTool = tool(
  async ({ name }: {
    name: string
  }) => {
    if (!name) {
      return 'No name provided.';
    }
    const sanitized = name.replace(/[&|!():*'<\->]/g, '');
    const sanitizedInputParts = sanitized.split(/\s/);
    const tsQueryArgs = sanitizedInputParts.length ? sanitizedInputParts.join(' | ') : sanitized;
    const query = sql`to_tsquery(${ tsQueryArgs })`;
    const person = (
      await db.selectFrom('people')
        .where('fts', '@@', query)
        .orderBy(({ ref }) =>
          sql`ts_rank_cd(${ ref('fts') }, ${ query }) desc`)
        .limit(1)
        .select(eb =>[
          'people.first_name',
          'people.last_name',
          'people.id',
          'people.slug',
          jsonArrayFrom(
            eb.selectFrom('races')
              .innerJoin('candidates', 'candidates.race_id', 'races.id')
              .whereRef('candidates.person_id', '=', 'people.id')
              .select([
                'races.title',
                'races.date',
              ])
          ).as('races')
        ])
        .executeTakeFirst()
    ) || null;
    return person
      ? [
        JSON.stringify({
          first_name: person.first_name,
          last_name: person.last_name,
          url: `https://localhost:3000/admin/people/${person.slug}`,
          candidateInElections: person.races,
        }),
        person,
      ]
      : [
        'Person not found',
        null,
      ];
  },
  {
    name: 'person_lookup',
    description: 'Looks up people in the database by name',
    schema: z.object({
      name: z.string(),
    }),
    responseFormat: 'content_and_artifact',
  });
