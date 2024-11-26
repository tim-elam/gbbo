import UserIcon from '@heroicons/react/24/outline/UserIcon';
import { ReactNode } from 'react';
import PersonDetailTabs from '@/components/admin/people/person-details/person-detail-tabs';

interface PersonDetailsProps {
  person: {
    firstName: string;
    lastName: string;
    slug: string;
  };
  children: ReactNode;
}

export default function PersonDetails({ person, children }: PersonDetailsProps) {
  const {
    firstName,
    lastName,
    slug,
  } = person;
  return (
    <div className="flex flex-col gap-4">
      <div className="card bg-base-100 shadow-md self-start">
        <div className="card-body">
          <h2 className="card-title">
            <UserIcon className="size-6 "/>
            { firstName } { lastName }
          </h2>
        </div>
      </div>
      <PersonDetailTabs slug={slug} />
      <div className="mx-2">
        { children }
      </div>
    </div>
  );
}
