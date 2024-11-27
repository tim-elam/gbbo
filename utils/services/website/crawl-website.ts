import { db } from '@/utils/data/kysely';
import { fetchSitemapUrls } from '@/utils/web/fetch-sitemap-urls';
import { getMarkdownContent } from '@/utils/web/get-markdown-content';
import { TableInsert } from '@/types/database';
import { randomUUID } from 'crypto';
import { createWebPageChunkInserts } from '@/utils/services/website/create-web-page-chunk-inserts';

export async function crawlWebsite({ slug }: {
  slug: string;
}) {
  const { origin } = await db.selectFrom('websites')
    .where('slug', '=', slug)
    .select('websites.origin')
    .executeTakeFirstOrThrow();

  const sitemapUrls = await fetchSitemapUrls(origin);

  const webPageInserts = await Promise.all(sitemapUrls.map(async url => {
    const pathname = url.substring(origin.length) || '/';
    const content = await getMarkdownContent(url);
    return ({
      id: randomUUID(),
      website_origin: origin,
      pathname,
      content,
    }) satisfies TableInsert<'web_pages'>;
  }));

  const webPageChunkInserts = (await Promise.all(
    webPageInserts.map(createWebPageChunkInserts),
  )).flat();


  await db.transaction().execute(async trx => {
    const webPageIdsToDelete = (
      await trx.selectFrom('web_pages')
        .where('web_pages.website_origin', '=', origin)
        .select('web_pages.id')
        .execute()
    ).map(({ id }) => id);

    await trx.deleteFrom('web_page_chunks')
      .where('web_page_id', 'in', webPageIdsToDelete)
      .execute();

    await trx.deleteFrom('web_pages')
      .where('id', 'in', webPageIdsToDelete)
      .execute();

    await trx.insertInto('web_pages')
      .values(webPageInserts)
      .execute();

    await trx.insertInto('web_page_chunks')
      .values(webPageChunkInserts)
      .execute();
  });
}
