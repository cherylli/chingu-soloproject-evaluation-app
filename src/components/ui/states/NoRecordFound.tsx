import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SearchX } from 'lucide-react';
import Link from 'next/link';

export default function NoRecordFound({
  message = 'No record found',
  actionButton,
}: {
  message?: string;
  actionButton?: {
    link: string;
    label: string;
  };
}) {
  return (
    <Card className="w-full text-center p-6 rounded-2xl shadow-sm border mt-6">
      <CardContent className="flex flex-col items-center justify-center gap-4 py-10">
        <SearchX className="h-12 w-12 text-muted-foreground" />
        <p className="text-lg font-medium text-muted-foreground">
          {message}
        </p>
        {actionButton && (
          <Button asChild>
            <Link href={actionButton.link}>
              {actionButton.label}
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
