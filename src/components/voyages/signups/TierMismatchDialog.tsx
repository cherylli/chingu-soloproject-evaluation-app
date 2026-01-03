import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { sendDiscordDM } from '@/services/discord';
import { VoyageSignupFields } from '@/types/VoyageSignupTypes';
import { AlertTriangle } from 'lucide-react';
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
    if (res.success) closeDialog();
  } catch (error) {
    if (error instanceof Error) toast.error(error.message);
    else
      toast.error(
        'Failed to send discord message. Please try again later.'
      );
  }
};

export function TierMismatchDialog({
  fields,
}: {
  fields: VoyageSignupFields;
}) {
  const [open, setOpen] = useState<boolean>(false);

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
      <DialogTrigger asChild>
        {/* add a tooltip */}
        <AlertTriangle className="h-6 w-6 text-red-500 cursor-pointer" />
      </DialogTrigger>
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
