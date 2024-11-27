'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { crawlWebsite } from '@/utils/services/website/crawl-website';

export async function crawl({ slug }: {
  slug: string;
}) {
  await crawlWebsite({ slug });
  const path = `/admin/websites/${ slug }`;
  revalidatePath(path);
  redirect(path);
}
