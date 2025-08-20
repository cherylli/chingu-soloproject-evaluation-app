import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import { ComponentType } from 'react';

// Tooltip with link text or icon
const TooltipWithLink = ({
  link,
  linkText,
  tooltip,
  Icon,
}: {
  link: string;
  tooltip: string;
} & (
  | { linkText: string; Icon?: ComponentType }
  | { linkText?: string; Icon: ComponentType }
)) => {
  if (!link) return;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={link}>
          {linkText}
          {Icon && <Icon />}
        </Link>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
};

export default TooltipWithLink;
