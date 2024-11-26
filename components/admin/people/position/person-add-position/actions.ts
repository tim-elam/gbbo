'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/utils/data/kysely';

export async function addPosition({ issueId, content, personSlug }: {
  issueId: string;
  content: string;
  personSlug: string;
}) {
  if (!content) {
    throw new Error('Content is required!');
  }
  const { personId } = await db.selectFrom('people')
    .where('slug', '=', personSlug)
    .select([
      'id as personId',
    ])
    .executeTakeFirstOrThrow();
  await db.insertInto('positions')
    .values({
      person_id: personId,
      issue_id: issueId,
      content,
    })
    .execute();
  revalidatePath(`/admin/people/${ personSlug }/positions`);
}
