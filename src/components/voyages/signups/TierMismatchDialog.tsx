import { Button } from '@/components/ui/button';
import LinkButton from '@/components/ui/buttons/LinkButton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { sendDiscordDM } from '@/services/discord';
import { VoyageSignupFields } from '@/types/VoyageSignupTypes';
import {
  AlertTriangle,
  StepForwardIcon,
  UserIcon,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const handleTierMismatch = async (
  discordId: string | number,
  signupTier: string,
  soloProjectTier: string,
  closeDialog: () => void
) => {
  if (!discordId) throw new Error('No discord ID');

  const message = `Hi <@${discordId}>, you have signed up for ${signupTier.toString().substring(0, 6)}, but your solo project is ${soloProjectTier.toString().substring(0, 6)}. We will move you to ${soloProjectTier.toString().substring(0, 6)}.`;
  // TODO: start sending toast

  try {
    const res = await toast.promise(
      sendDiscordDM(discordId.toString(), message),
      {
        loading: 'Sending Discord Message...',
        success:
          'Discord Message Sent and Tier Changed Successfully',
        error: 'Failed to change tier',
      }
    );
    // TODO: also change "team name" to the right tier
    if (res.success) closeDialog();
  } catch (error) {
    if (error instanceof Error) toast.error(error.message);
    else
      toast.error(
        'Failed to send discord message. Please try again later.'
      );
  }
};

/**
 * Display a dialog that surfaces and manages tier mismatches for a voyage signup.
 *
 * Shows the detected solo project tier and the applied team tier, indicates pending
 * tier confirmation when applicable, and provides optional links to the solo project
 * and member profile along with an action to notify the member and update the signup tier.
 *
 * @param fields - The voyage signup fields for the affected member
 * @returns A React element rendering the tier mismatch dialog
 */
export function TierMismatchDialog({
  fields,
}: {
  fields: VoyageSignupFields;
}) {
  const [open, setOpen] = useState<boolean>(false);

  const soloProjectLink = fields['Solo Project Link']?.[0]
    ? `/solo-project/${fields['Solo Project Link'][0]}`
    : undefined;
  const memberDetailsPage = fields['Discord ID']
    ? `/members/${fields['Discord ID']}`
    : undefined;

  const soloProjectTier =
    fields['Solo Project Tier (Lookup)']?.[0] || '';
  const appliedTier = fields['Team Name'];
  const isPendingTierConfirmation =
    fields['Solo Project Tier (Lookup)']?.[0] === '*'; // starts with *
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <AlertTriangle className="h-6 w-6 text-red-500 cursor-pointer" />
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          {`Tier mismatch detected. Solo project tier:
            ${soloProjectTier.slice(0, 6)}`}
        </TooltipContent>
      </Tooltip>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Tier Mismatch - {fields['Discord Name']}
          </DialogTitle>
          <DialogDescription className="flex flex-col gap-2">
            {isPendingTierConfirmation ? (
              <span>Pending Tier Confirmation</span>
            ) : (
              <></>
            )}
            <span>
              <span className="mr-3">
                Solo Project Tier:
              </span>
              <span className="font-bold">
                {soloProjectTier.slice(0, 6)}
              </span>
            </span>
            <span>
              <span className="mr-3">Applied Tier:</span>
              <span className="font-bold">
                {appliedTier}
              </span>
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2">
          {soloProjectLink && (
            <LinkButton
              url={soloProjectLink}
              Icon={StepForwardIcon}
              tooltip="View solo project"
            />
          )}
          {memberDetailsPage && (
            <LinkButton
              url={memberDetailsPage}
              Icon={UserIcon}
              tooltip="Member profile"
            />
          )}
        </div>
        <Button
          className="cursor-pointer"
          onClick={() =>
            handleTierMismatch(
              fields['Discord ID'],
              fields['Tier'],
              fields['Solo Project Tier (Lookup)'],
              () => setOpen(false)
            )
          }
        >
          Send Discord Message and Change Voyage Signup Tier
        </Button>
      </DialogContent>
    </Dialog>
  );
}