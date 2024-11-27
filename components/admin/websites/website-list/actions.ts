'use server';

import { db } from '@/utils/data/kysely';
import { fetchSitemapUrls } from '@/utils/web/fetch-sitemap-urls';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { TableInsert } from '@/types/database';
import { getMarkdownContent } from '@/utils/web/get-markdown-content';

export async function crawl({ slug }: {
  slug: string;
}) {
  const { origin } = await db.selectFrom('websites')
    .where('slug', '=', slug)
    .select('websites.origin')
    .executeTakeFirstOrThrow();

  const sitemapUrls = await fetchSitemapUrls(origin);

  const values = await Promise.all(sitemapUrls.map(async url => {
    const pathname = url.substring(origin.length) || '/';
    const slug = pathname
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replaceAll('/', '-')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
    const content = await getMarkdownContent(url);
    return ({
      website_origin: origin,
      pathname,
      slug,
      content,
    }) satisfies TableInsert<'web_pages'>;
  }));

  await db.insertInto('web_pages')
    .values(values)
    .onConflict(oc => oc
      .columns(['website_origin', 'slug'])
      .doUpdateSet({
        content: eb => eb.ref('excluded.content'),
      }))
    .execute();
  const path = `/admin/websites/${ slug }`;
  revalidatePath(path);
  redirect(path);
}
