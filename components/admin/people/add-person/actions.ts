'use server';

import { db } from '@/utils/data/kysely';
import { revalidatePath } from 'next/cache';

export async function addPerson(formData: FormData) {
  const first_name = (formData.get('first_name') as string).trim();
  const last_name = (formData.get('last_name') as string).trim();
  const slug = [first_name, last_name].join('-')
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
  await db.insertInto('people')
    .values({
      first_name,
      last_name,
      slug,
    })
    .execute();
  revalidatePath('/admin/people');
}
