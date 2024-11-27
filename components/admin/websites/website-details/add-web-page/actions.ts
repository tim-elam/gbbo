'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/utils/data/kysely';

export async function addWebsiteWebPage({ pathname, websiteSlug, websiteOrigin }: {
  websiteOrigin: string;
  pathname: string;
  websiteSlug: string;
}) {
  await db.insertInto('web_pages')
    .values({
      website_origin: websiteOrigin,
      pathname,
    })
    .execute();
  revalidatePath(`/admin/websites/${ websiteSlug }`);
}
