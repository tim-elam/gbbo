import PersonEnterRace from '@/components/admin/people/race/person-enter-race/person-enter-race';
import PersonRaceList from '@/components/admin/people/race/person-race-list/person-race-list';
import { db } from '@/utils/data/kysely';

export default async function PeopleRaces(options: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await options.params;
  const [races, notEnteredRaces] = await Promise.all([db.selectFrom('races')
    .innerJoin('candidates', 'races.id', 'candidates.race_id')
    .innerJoin('people', 'people.id', 'candidates.person_id')
    .where('people.slug', '=', slug)
    .orderBy('races.date desc')
    .orderBy('races.title asc')
    .select([
      'races.id',
      'races.slug',
      'races.title',
      'races.date',
    ])
    .execute(),
    db.selectFrom('races')
      .where(eb => eb.not(
        eb.exists(
          eb.selectFrom('candidates')
            .whereRef('candidates.race_id', '=', 'races.id')
            .innerJoin('people', 'people.id', 'candidates.person_id')
            .where('people.slug', '=', slug),
        ),
      ))
      .select([
        'races.id',
        'races.title',
        'races.slug',
      ])
      .execute()]);

  return (
    <div className="flex flex-col gap-4">
      <PersonEnterRace personSlug={ slug } races={ notEnteredRaces }/>
      <PersonRaceList races={ races }/>
    </div>
  );
}
