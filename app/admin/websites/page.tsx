import AddWebsite from '@/components/admin/websites/add-website/add-website';
import WebsitesList from '@/components/admin/websites/website-list/website-list';
import { db } from '@/utils/data/kysely';

export default async function WebsitesPage() {
  const [websites, people] = await Promise.all([
    db.selectFrom('websites')
      .orderBy('websites.title')
      .innerJoin('people', 'people.id', 'websites.person_id')
      .select([
        'websites.id as id',
        'websites.origin as origin',
        'websites.title as title',
        'websites.slug as slug',
        'people.first_name as personFirstName',
        'people.last_name as personLastName',
        'people.slug as personSlug',
      ])
      .execute(),
    db.selectFrom('people')
      .select([
        'people.id',
        'people.slug',
        'people.first_name as firstName',
        'people.last_name as lastName',
      ])
      .execute(),
  ]);
  return (
    <div className="flex flex-col gap-4">
      <AddWebsite people={ people }/>
      <WebsitesList websites={ websites }/>
    </div>
  );
}
