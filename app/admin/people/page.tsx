import { db } from '@/utils/data/kysely';
import PeopleList from '@/components/admin/people/people-list/people-list';
import AddPerson from '@/components/admin/people/add-person/add-person';

export default async function PeoplePage() {
  const people = await db.selectFrom('people')
    .orderBy('last_name asc')
    .orderBy('first_name asc')
    .selectAll()
    .execute();
  return (
    <div className="flex flex-col gap-4">
      <AddPerson />
      <PeopleList people={people}/>
    </div>
  );
}
