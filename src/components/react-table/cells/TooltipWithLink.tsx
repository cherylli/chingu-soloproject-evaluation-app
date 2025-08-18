import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';

const TooltipWithLink = ({
  link,
  linkText,
  tooltip,
}: {
  link: string;
  linkText: string;
  tooltip: string;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={link}>{linkText}</Link>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
};

export default TooltipWithLink;
