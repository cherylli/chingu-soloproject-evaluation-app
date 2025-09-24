import { Button } from '@/components/ui/button';
import { IconType } from '@icons-pack/react-simple-icons';
import { LucideIcon } from 'lucide-react';

const ButtonIconWithAction = ({
  className,
  Icon,
  onClick,
}: {
  className?: string;
  Icon: LucideIcon | IconType;
  onClick: () => void;
}) => {
  return (
    <Button
      variant="outline"
      size="icon"
      className={`h-8 w-8 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
};

export default ButtonIconWithAction;
