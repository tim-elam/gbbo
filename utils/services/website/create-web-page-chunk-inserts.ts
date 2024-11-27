import { TableInsert } from '@/types/database';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { OpenAIEmbeddings } from '@langchain/openai';
import { getOpenAIEmbeddings } from '@/utils/langchain/openai/get-openai-embeddings';
import { toSql } from 'pgvector';

let markdownSplitter: RecursiveCharacterTextSplitter;
let openaiEmbeddings: OpenAIEmbeddings;

export async function createWebPageChunkInserts(webPage: Pick<TableInsert<'web_pages'>, 'id' |'content'>)  {
  if (!webPage.content) {
    return [];
  }
  markdownSplitter ||= RecursiveCharacterTextSplitter.fromLanguage('markdown', {
    chunkSize: 500,
    chunkOverlap: 75,
  });
  openaiEmbeddings ||= getOpenAIEmbeddings();
  const documents = await markdownSplitter.createDocuments([webPage.content]);
  const embeddings = await openaiEmbeddings.embedDocuments(documents.map(({ pageContent }) => pageContent));
  return documents.map(({ pageContent, metadata }, index) => ({
      content: pageContent,
      embedding: toSql(embeddings[index]),
      web_page_id: webPage.id,
      from_line: metadata.loc.lines.from,
      to_line: metadata.loc.lines.to,
  } satisfies TableInsert<'web_page_chunks'>));
}
