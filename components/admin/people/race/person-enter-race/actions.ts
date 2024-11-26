'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/utils/data/kysely';

export async function enterRace({ personSlug, race }: {
  personSlug: string;
  race: {
    id: string;
    slug: string;
  } | null;
}) {
  if (!race) {
    throw new Error('Race is required!');
  }
  const { personId } = await db.selectFrom('people')
    .where('slug', '=', personSlug)
    .select([
      'id as personId',
    ])
    .executeTakeFirstOrThrow();
  await db.insertInto('candidates')
    .values({
      race_id: race.id,
      person_id: personId,
    })
    .execute();
  revalidatePath(`/admin/people/${ personSlug }/races`);
  revalidatePath(`/admin/races/${ race.slug }`);
}
