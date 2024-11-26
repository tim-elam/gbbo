import RaceCandidateList from '@/components/admin/races/race-candidate-list/race-candidate-list';
import { db } from '@/utils/data/kysely';
import { jsonArrayFrom } from 'kysely/helpers/postgres';
import RaceAddCandidate from '@/components/admin/races/race-add-candidate/race-add-candidate';

export default async function RacePage({ params }: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const {
    raceId,
    candidates,
    nonCandidates,
  } = await db.selectFrom('races')
    .where('races.slug', '=', slug)
    .select((eb) => ([
      'races.id as raceId',
      jsonArrayFrom(
        eb.selectFrom('candidates')
          .whereRef('candidates.race_id', '=', 'races.id')
          .innerJoin('people', 'people.id', 'candidates.person_id')
          .select([
            'candidates.person_id',
            'people.first_name',
            'people.last_name',
          ]),
      ).as('candidates'),
      jsonArrayFrom(
        eb.selectFrom('people as p')
          .where(eb =>
            eb.not(
              eb.exists(eb =>
                eb.selectFrom('candidates')
                  .whereRef('candidates.race_id', '=', 'races.id')
                  .whereRef('candidates.person_id', '=', 'p.id'),
              )))
          .where('p.id', 'is not', null)
          .select([
            'p.id',
            'p.first_name',
            'p.last_name',
          ]),
      ).as('nonCandidates'),
    ]))
    .executeTakeFirstOrThrow();

  return (
    <div className="flex flex-col gap-4">
      <RaceAddCandidate
        raceId={ raceId }
        raceSlug={ slug }
        nonCandidates={ nonCandidates }/>
      <RaceCandidateList
        candidates={ candidates }/>
    </div>
  );
}
