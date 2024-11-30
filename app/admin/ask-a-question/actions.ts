'use server';

import { askLangchainQuestion } from '@/utils/question/ask-question';

export async function askQuestion(question: string) {
  return askLangchainQuestion(question);
}
