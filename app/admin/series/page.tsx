import AddSeries from '@/components/admin/series/add-series/add-series';
import SeriesList from '@/components/admin/series/series-list/series-list';
import { TableRow } from '@/types/database';
import { db } from '@/utils/data/kysely';

export const dynamic = 'force-dynamic';

export default async function Series() {
  const bakers = await db.selectFrom('bakers')
    .selectAll()
    .execute();
  const series = bakers.reduce(
    (map, baker) => {
      if (!map.has(baker.series_number)) {
        map.set(baker.series_number, []);
      }
      map.get(baker.series_number)!.push(baker);
      return map
    },
    new Map<number, TableRow<'bakers'>[]>(),
  );
  return (
    <div className="flex flex-col gap-4">
      <AddSeries/>
      <SeriesList series={ series }/>
    </div>
  );
}
