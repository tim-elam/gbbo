'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/utils/data/kysely';

export async function addWebsite({ personSlug, title, origin }: {
  personSlug: string;
  title: string;
  origin: string;
}) {
  const { personId } = await db.selectFrom('people')
    .where('slug', '=', personSlug)
    .select([
      'id as personId',
    ])
    .executeTakeFirstOrThrow();
  const slug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
  await db.insertInto('websites')
    .values({
      person_id: personId,
      slug,
      title,
      origin,
    })
    .execute();
  revalidatePath(`/admin/people/${ personSlug }/websites`);
}
