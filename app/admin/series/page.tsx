import AddSeries from '@/components/admin/series/add-series/add-series';
import SeriesList from '@/components/admin/series/series-list/series-list';
import { db } from '@/utils/data/kysely';

export const dynamic = 'force-dynamic';

export default async function Series() {
  const series = await db.selectFrom('series')
    .selectAll()
    .execute();
  return (
    <div className="flex flex-col gap-4">
      <AddSeries/>
      <SeriesList series={ series }/>
    </div>
  );
}
