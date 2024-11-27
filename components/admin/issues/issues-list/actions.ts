'use server';

import { getOpenAIEmbeddings } from '@/utils/langchain/openai/get-openai-embeddings';
import { OpenAIEmbeddings } from '@langchain/openai';
import { db } from '@/utils/data/kysely';
import { toSql } from 'pgvector';

let openaiEmbeddings: OpenAIEmbeddings;

export async function computeEmbedding(title: string) {
  openaiEmbeddings ||= getOpenAIEmbeddings();
  const embedding = await openaiEmbeddings.embedQuery(title);
  await db.updateTable('issues')
    .where('title', '=', title)
    .set({ embedding: toSql(embedding) })
    .execute();
}
