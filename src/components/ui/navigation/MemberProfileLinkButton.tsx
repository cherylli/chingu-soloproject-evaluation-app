'use client';

import { User } from 'lucide-react';
import Link from 'next/link';

const MemberProfileButton = ({
  discordId,
}: {
  discordId: string;
}) => {
  return (
    <Link href={`/admin/member/${discordId}`}>
      <User />
    </Link>
  );
};

export default MemberProfileButton;
