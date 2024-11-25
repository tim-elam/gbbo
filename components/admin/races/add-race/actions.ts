'use server';

import { db } from '@/utils/data/kysely';
import { revalidatePath } from 'next/cache';

export async function addRace(formData: FormData) {
  const title = (formData.get('title') as string).trim();
  const date = formData.get('date') as string;
  const slug = title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  await db.insertInto('races')
    .values({
      title,
      slug,
      date,
    })
    .execute();
  revalidatePath('/admin/races');
}
