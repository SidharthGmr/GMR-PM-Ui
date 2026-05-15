import GetAllUsersListingWrapper from '@/components/features/get-all-users/listing-wrapper';
import config from '@/config';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `User List- ${config.appName}`,
};

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <GetAllUsersListingWrapper />
    </div>
  );
}
