'use server';

import { db } from '@/utils/data/kysely';
import { revalidatePath } from 'next/cache';

export async function addIssue(formData: FormData) {
  const title = (formData.get('title') as string).trim();
  const slug = title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  await db.insertInto('issues')
    .values({
      title,
      slug,
    })
    .execute();
  revalidatePath('/admin/issues');
}
