'use server';

import { db } from '@/utils/data/kysely';
import { revalidatePath } from 'next/cache';
import { getOpenAIEmbeddings } from '@/utils/langchain/openai/get-openai-embeddings';
import { OpenAIEmbeddings } from '@langchain/openai';
import { toSql } from 'pgvector';

let openaiEmbeddings: OpenAIEmbeddings;

export async function addIssue(formData: FormData) {
  const title = (formData.get('title') as string).trim();
  const slug = title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');

  openaiEmbeddings ||= getOpenAIEmbeddings();
  const embedding = await openaiEmbeddings.embedQuery(title);
  await db.insertInto('issues')
    .values({
      title,
      slug,
      embedding: toSql(embedding),
    })
    .execute();
  revalidatePath('/admin/issues');
}
