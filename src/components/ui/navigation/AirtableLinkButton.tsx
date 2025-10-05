'use client';

import { Button } from '@/components/ui/button';
import { useRoleCheck } from '@/hooks/useRoleCheck';
import { SiAirtable } from '@icons-pack/react-simple-icons';
import { ArrowUpRight } from 'lucide-react';

// This is the link button with airtable link shown in the top left of most pages
// which links to the airtable table

const AirtableLinkButton = ({
  path,
  label,
}: {
  path: string;
  label: string;
}) => {
  const { isAdmin } = useRoleCheck();
  if (!isAdmin) return null;
  return (
    <Button
      variant="link"
      className="cursor-pointer self-start"
      asChild
    >
      <a
        href={path}
        target="_blank"
        rel="noreferrer"
      >
        <SiAirtable />
        {label}
        <ArrowUpRight />
      </a>
    </Button>
  );
};

export default AirtableLinkButton;
