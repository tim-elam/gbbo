import { db } from '@/utils/data/kysely';
import { jsonArrayFrom } from 'kysely/helpers/postgres';
import PersonAddPosition from '@/components/admin/people/position/person-add-position/person-add-position';
import PersonPositionsList from '@/components/admin/people/position/person-positions-list/person-positions-list';

export default async function PeoplePositions(options: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await options.params;
  const [positions, issues] = await Promise.all([db.selectFrom('positions')
    .innerJoin('people', 'people.id', 'positions.person_id')
    .innerJoin('issues', 'issues.id', 'positions.issue_id')
    .where('people.slug', '=', slug)
    .orderBy('issues.title')
    .orderBy('positions.content')
    .select(eb => [
      'positions.content',
      'issues.title as issueTitle',
      'issues.id as issueId',
      'positions.id as id',
      jsonArrayFrom(
        eb.selectFrom('issues as i')
          .orderBy('i.title')
          .select([
            'i.id as id',
            'i.title as title',
          ]),
      ).as('allIssues'),
    ])
    .execute(),
    db.selectFrom('issues')
      .orderBy('title')
      .select([
        'issues.id',
        'issues.title',
      ]).execute(),
  ]);

  return (
    <div className="flex flex-col gap-4">
      <PersonAddPosition personSlug={slug} issues={ issues }/>
      <PersonPositionsList positions={ positions }/>
    </div>
  );
}
