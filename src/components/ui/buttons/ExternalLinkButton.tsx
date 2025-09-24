import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { z } from 'zod';

const ExternalLinkButtonPropSchema = z.object({
  url: z.url(),
});
type LinkProps = z.infer<
  typeof ExternalLinkButtonPropSchema
>;

const ExternalLinkButton = (props: LinkProps) => {
  const prasedProps =
    ExternalLinkButtonPropSchema.parse(props) ||
    'Invalid link';

  return (
    <a
      href={prasedProps.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 cursor-pointer"
      >
        <ExternalLink />
      </Button>
    </a>
  );
};

export default ExternalLinkButton;
