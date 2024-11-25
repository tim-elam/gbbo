import AddRace from '@/components/admin/races/add-race/add-race';
import RacesList from '@/components/admin/races/races-list/races-list';
import { db } from '@/utils/data/kysely';

export default async function RacesPage() {
  const races = await db.selectFrom('races')
    .orderBy('date desc')
    .selectAll()
    .execute();
  return (
    <div className="flex flex-col gap-4">
      <AddRace />
      <RacesList races={races}/>
    </div>
  );
}
