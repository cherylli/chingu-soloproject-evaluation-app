'use client';

import { Button } from '@/components/ui/button';
import { useRoleCheck } from '@/hooks/useRoleCheck';
import { SiAirtable } from '@icons-pack/react-simple-icons';
import { ArrowUpRight } from 'lucide-react';

const BackButton = ({
  path,
  label,
}: {
  path: string;
  label: string;
}) => {
  const { isAdmin } = useRoleCheck();
  if (!isAdmin) return null;
  return (
    <a
      href={path}
      target="_blank"
      rel="noreferrer"
    >
      <Button
        variant="link"
        className="cursor-pointer"
      >
        <SiAirtable />
        {label}
        <ArrowUpRight />
      </Button>
    </a>
  );
};

export default BackButton;
