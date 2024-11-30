import { OpenAIEmbeddings } from '@langchain/openai';
import { Resource } from 'sst';

export function getOpenAIEmbeddings() {
  return new OpenAIEmbeddings({
    apiKey: Resource.OPENAI_API_KEY.value.trim(),
    model: 'text-embedding-3-small'
  });
}
