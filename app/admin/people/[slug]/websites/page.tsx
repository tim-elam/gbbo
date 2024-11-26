import { db } from '@/utils/data/kysely';
import PersonAddWebsite from '@/components/admin/people/website/person-add-website/person-add-website';
import PersonWebsiteList from '@/components/admin/people/website/person-website-list/person-website-list';

export default async function PeopleWebsites(options: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await options.params;
  const websites = await db.selectFrom('websites')
    .innerJoin('people', 'people.id', 'websites.person_id')
    .where('people.slug', '=', slug)
    .select([
      'websites.title',
      'websites.origin',
      'websites.slug',
    ])
    .execute();

  return (
    <div className="flex flex-col gap-4">
      <PersonAddWebsite personSlug={slug} />
      <PersonWebsiteList websites={ websites }/>
    </div>
  );
}
