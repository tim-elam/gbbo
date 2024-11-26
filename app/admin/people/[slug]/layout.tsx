import { db } from '@/utils/data/kysely';
import { jsonArrayFrom } from 'kysely/helpers/postgres';
import { ReactNode } from 'react';
import PersonDetails from '@/components/admin/people/person-details/person-details';

export default async function PersonPage({ children, params}: {
  params: Promise<{ slug: string }>;
  children: ReactNode;
}) {
  const slug = (await params).slug;
  const person = await db.selectFrom('people')
    .where('people.slug', '=', slug)
    .select(eb => [
      'people.first_name as firstName',
      'people.id as id',
      'people.last_name as lastName',
      'people.slug as slug',
      jsonArrayFrom(
        eb.selectFrom('positions')
          .whereRef('positions.person_id', '=', 'people.id')
          .innerJoin('issues', 'issues.id', 'positions.issue_id')
          .select([
            'issues.title',
            'positions.content',
          ]),
      ).as('positions'),
    ])
    .executeTakeFirstOrThrow();

  return (
    <PersonDetails person={ person }>
      { children }
    </PersonDetails>
  );
}
