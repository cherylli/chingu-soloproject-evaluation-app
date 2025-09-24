import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { IconType } from '@icons-pack/react-simple-icons';
import { LucideIcon } from 'lucide-react';

const ButtonIconWithAction = ({
  className,
  Icon,
  onClick,
  tooltip,
}: {
  className?: string;
  Icon: LucideIcon | IconType;
  onClick: () => void;
  tooltip?: string;
}) => {
  const buttonElement = (
    <Button
      variant="outline"
      size="icon"
      className={`h-8 w-8 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );

  if (!tooltip) {
    return buttonElement;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {buttonElement}
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
};

export default ButtonIconWithAction;
