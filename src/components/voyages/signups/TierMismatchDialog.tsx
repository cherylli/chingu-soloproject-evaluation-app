/**
 * @file TierMismatchDialog.tsx
 * @description Provides a UI component for administrators to handle discrepancies between a members's
 * applied Voyage tier and their evaluated Solo Project tier.
 *
 * Features:
 * - Detects and displays tier mismatches via a warning icon and tooltip.
 * - Opens a dialog with details about the solo project and applied tiers.
 * - Automates the correction process by sending a Discord DM to the member and
 *   updating the Airtable record to the correct tier in one click.
 */

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
import { updateVoyageSignupTierByRecordId } from '@/services/voyages';
import { SoloProjectTier } from '@/types/SoloProjectTypes';
import {
  VoyageSignupFields,
  VoyageSignupTeamNameType,
} from '@/types/VoyageSignupTypes';
import {
  AlertTriangle,
  StepForwardIcon,
  UserIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const tierMap: Record<
  SoloProjectTier,
  VoyageSignupTeamNameType
> = {
  'Tier 1 - Beginner (ONLY for Developer role)': 'Tier 1',
  'Tier 2  - Intermediate (All roles)': 'Tier 2',
  'Tier 3 - Experienced (All roles)': 'Tier 3',
  '*Tier1': 'Tier 1',
  '*Tier2': 'Tier 2',
  '*Tier3': 'Tier 3',
};

/**
 * Orchestrates the automated resolution of a tier mismatch.
 *
 * @param voyageSignupRecordId - The unique ID of the signup record in airtable.
 * @param discordId - Member's Discord ID for messaging.
 * @param signupTier - The tier the member originally signed up for.
 * @param soloProjectTier - The tier determined by their solo project evaluation.
 * @param closeDialog - Callback to close the UI dialog on success.
 * @param router - Next.js router instance to refresh the server-side data.
 */
const handleTierMismatch = async (
  voyageSignupRecordId: string,
  discordId: string | number,
  signupTier: string,
  soloProjectTier: string,
  closeDialog: () => void,
  router: ReturnType<typeof useRouter>
) => {
  if (!discordId) throw new Error('No discord ID');

  const message = `Hi <@${discordId}>, you have signed up for ${signupTier.toString().substring(0, 6)}, but your solo project is ${soloProjectTier.toString().substring(0, 6)}. We will move you to ${soloProjectTier.toString().substring(0, 6)}.`;

  try {
    const res = await toast.promise(
      (async () => {
        const discordMsgRes = await sendDiscordDM(
          discordId.toString(),
          message
        );

        if (!discordMsgRes.success)
          throw new Error(
            `[Tier Mismatch Dialog]: fail to send discord message - ${discordMsgRes.message}`
          );

        const updateTierRes =
          await updateVoyageSignupTierByRecordId(
            voyageSignupRecordId,
            tierMap[soloProjectTier as SoloProjectTier]
          );

        if (!updateTierRes.success)
          throw new Error(
            `[Tier Mismatch Dialog]: fail to update tier - ${updateTierRes.message}`
          );
        return updateTierRes;
      })(),
      {
        loading: 'Sending Discord Message...',
        success:
          'Discord Message Sent and Tier Changed Successfully',
        error: 'Failed to change tier',
      }
    );
    // TODO: also change "team name" to the right tier
    if (res.success) {
      closeDialog();
      router.refresh();
    }
  } catch (error) {
    if (error instanceof Error) toast.error(error.message);
    else
      toast.error(
        'Failed to send discord message. Please try again later.'
      );
  }
};

/**
 * A dialog component that triggers when a tier mismatch is detected.
 * It shows a warning icon that, when clicked, allows admins to synchronize the tiers.
 *
 * @param recordId - The database record ID for the specific signup.
 * @param fields - The data object containing the user's signup and solo project information.
 */
export function TierMismatchDialog({
  recordId,
  fields,
}: {
  recordId: string;
  fields: VoyageSignupFields;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

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
              recordId,
              fields['Discord ID'],
              fields['Tier'],
              fields['Solo Project Tier (Lookup)'],
              () => setOpen(false),
              router
            )
          }
        >
          Send Discord Message and Change Voyage Signup Tier
        </Button>
      </DialogContent>
    </Dialog>
  );
}
