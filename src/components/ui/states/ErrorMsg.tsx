import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ErrorMsg({
  message = 'Error',
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
        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
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
