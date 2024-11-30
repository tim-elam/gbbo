import { ChatOpenAI } from '@langchain/openai';
import { Resource } from 'sst';

export function getChatOpenAI() {
  return new ChatOpenAI({
    model: 'gpt-4o',
    apiKey: Resource.OPENAI_API_KEY.value.trim(),
  });
}
