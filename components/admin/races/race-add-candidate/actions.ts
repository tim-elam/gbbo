'use server';

import { db } from '@/utils/data/kysely';
import { revalidatePath } from 'next/cache';

export async function addRaceCandidate({ raceSlug, raceId, personId }: {
  raceSlug: string,
  raceId: string,
  personId: string
}) {
  await db.insertInto('candidates')
    .values({
      person_id: personId,
      race_id: raceId,
    })
    .execute();
  revalidatePath('/admin/races');
  revalidatePath(`/admin/races/${raceSlug}`);
}
