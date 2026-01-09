import LinkButton from '@/components/ui/buttons/LinkButton';
import { IconType } from '@icons-pack/react-simple-icons';
import { LucideIcon } from 'lucide-react';
import { z } from 'zod';

const ExternalLinkButtonPropSchema = z.object({
  url: z.url(),
  Icon: z.custom<LucideIcon | IconType>().optional(),
  text: z.string().optional(),
  tooltip: z.string().optional(),
});
type LinkProps = z.infer<
  typeof ExternalLinkButtonPropSchema
>;

const ExternalLinkButton = (props: LinkProps) => {
  const parsedProps =
    ExternalLinkButtonPropSchema.parse(props) ||
    'Invalid link';

  return (
    <LinkButton
      url={parsedProps.url}
      Icon={parsedProps.Icon}
      text={parsedProps.text}
      tooltip={parsedProps.tooltip}
    />
  );
};

export default ExternalLinkButton;
