/*
Base Link button which doesn't verify external links with zod
use for internal link or links with no validation requirement
 */

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { IconType } from '@icons-pack/react-simple-icons';
import { ExternalLink, LucideIcon } from 'lucide-react';
import { z } from 'zod';

const LinkButtonPropSchema = z.object({
  url: z.string(),
  Icon: z.custom<LucideIcon | IconType>().optional(),
  text: z.string().optional(),
  tooltip: z.string().optional(),
});
type LinkProps = z.infer<typeof LinkButtonPropSchema>;

const LinkButton = (props: LinkProps) => {
  const parsedProps =
    LinkButtonPropSchema.parse(props) || 'Invalid link';

  const buttonElement = (
    <a
      href={parsedProps.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button
        variant="outline"
        size={parsedProps.text ? 'default' : 'icon'}
        className="cursor-pointer"
      >
        {parsedProps.Icon ? (
          <parsedProps.Icon />
        ) : (
          <ExternalLink />
        )}
        {parsedProps.text && (
          <span>{parsedProps.text}</span>
        )}
      </Button>
    </a>
  );

  if (!parsedProps.tooltip) {
    return buttonElement;
  }
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {buttonElement}
      </TooltipTrigger>
      <TooltipContent>{parsedProps.tooltip}</TooltipContent>
    </Tooltip>
  );
};

export default LinkButton;
