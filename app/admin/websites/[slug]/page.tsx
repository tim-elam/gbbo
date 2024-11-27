import WebsiteAddWebPage from '@/components/admin/websites/website-details/add-web-page/website-add-web-page';
import { db } from '@/utils/data/kysely';
import WebsiteWebPageList from '@/components/admin/websites/website-details/web-page-list/website-web-page-list';
import { sql } from 'kysely';

export default async function RacePage({ params }: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const [website, webPages] = await Promise.all([
    db.selectFrom('websites')
      .where('slug', '=', slug)
      .select([
        'websites.origin',
        'websites.slug',
      ])
      .executeTakeFirstOrThrow(),
    db.selectFrom('web_pages')
      .innerJoin('websites', 'websites.origin', 'web_pages.website_origin')
      .where('websites.slug', '=', slug)
      .select([
        'web_pages.pathname',
        sql<string>('substring(web_pages.content  from 1 for 50)').as('content'),
      ])
      .execute(),
  ]);

  return (
    <div className="flex flex-col gap-4">
      <WebsiteAddWebPage website={website}/>
      <WebsiteWebPageList
        webPages={ webPages }/>
    </div>
  );
}
