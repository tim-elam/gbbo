import { db } from '@/utils/data/kysely';
import WebPageChunkList from '@/components/admin/websites/website-details/web-pages/web-page-chunk-list';

export default async function WebPageDetailPage({ params }: {
  params: Promise<{ slug: string; webPageId: string; }>;
}) {
  const { webPageId } = await params;
  const webPageChunks = await db.selectFrom('web_page_chunks')
    .where('web_page_id', '=', webPageId)
    .select([
      'web_page_chunks.from_line as fromLine',
      'web_page_chunks.to_line as toLine',
      'web_page_chunks.content',
    ])
    .execute();

  return (
    <div className="flex flex-col gap-4">
      <WebPageChunkList webPageChunks={ webPageChunks }/>
    </div>
  );
}
