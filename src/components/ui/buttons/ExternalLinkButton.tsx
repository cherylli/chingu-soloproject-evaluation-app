import { Button } from '@/components/ui/button';
import { IconType } from '@icons-pack/react-simple-icons';
import { ExternalLink, LucideIcon } from 'lucide-react';
import { z } from 'zod';

const ExternalLinkButtonPropSchema = z.object({
  url: z.url(),
  Icon: z.custom<LucideIcon | IconType>().optional(),
  text: z.string().optional(),
});
type LinkProps = z.infer<
  typeof ExternalLinkButtonPropSchema
>;

const ExternalLinkButton = (props: LinkProps) => {
  const parsedProps =
    ExternalLinkButtonPropSchema.parse(props) ||
    'Invalid link';

  return (
    <a
      href={parsedProps.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button
        variant="outline"
        size={props.text ? 'default' : 'icon'}
        className="cursor-pointer"
      >
        {props.Icon ? <props.Icon /> : <ExternalLink />}
        {props.text && <span>{props.text}</span>}
      </Button>
    </a>
  );
};

export default ExternalLinkButton;
