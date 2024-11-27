import AddIssue from '@/components/admin/issues/add-issue/add-issue';
import IssuesList from '@/components/admin/issues/issues-list/issues-list';
import { db } from '@/utils/data/kysely';

export default async function IssuesPage() {
  const issues = await db.selectFrom('issues')
    .orderBy('title asc')
    .select([
      'issues.slug',
      'issues.title',
    ])
    .execute();
  return (
    <div className="flex flex-col gap-4">
      <AddIssue />
      <IssuesList issues={issues}/>
    </div>
  );
}
