import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const BackButton = ({
  path,
  label,
}: {
  path: string;
  label: string;
}) => {
  return (
    <Link href={path}>
      <Button
        variant="link"
        className="cursor-pointer mb-5"
      >
        <ArrowLeft />
        {label}
      </Button>
    </Link>
  );
};

export default BackButton;
