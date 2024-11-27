'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/utils/data/kysely';

export async function addWebsite({ person, title, origin }: {
  person: {
    slug: string;
    id: string;
  } | null;
  title: string;
  origin: string;
}) {
  if (!person) {
    throw Error('Person is required!');
  }
  const slug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
  await db.insertInto('websites')
    .values({
      person_id: person.id,
      slug,
      title,
      origin,
    })
    .execute();
  revalidatePath(`/admin/people/${ person.slug }/websites`);
  revalidatePath(`/admin/people/websites`);
}
