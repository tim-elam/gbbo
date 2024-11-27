'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/utils/data/kysely';

export async function addWebsiteWebPage({ pathname, websiteSlug, websiteOrigin }: {
  websiteOrigin: string;
  pathname: string;
  websiteSlug: string;
}) {
  const slug = pathname
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replaceAll('/', '-')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
  await db.insertInto('web_pages')
    .values({
      website_origin: websiteOrigin,
      pathname,
      slug,
    })
    .execute();
  revalidatePath(`/admin/websites/${ websiteSlug }`);
}
