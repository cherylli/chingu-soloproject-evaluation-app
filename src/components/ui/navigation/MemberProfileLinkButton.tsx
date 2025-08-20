'use client';

import { useRoleCheck } from '@/hooks/useRoleCheck';
import { User } from 'lucide-react';
import Link from 'next/link';

const MemberProfileButton = ({
  discordId,
}: {
  discordId: string;
}) => {
  const { isAdmin } = useRoleCheck();
  if (!isAdmin) return null;
  return (
    <Link href={`/admin/member/${discordId}`}>
      <User />
    </Link>
  );
};

export default MemberProfileButton;
