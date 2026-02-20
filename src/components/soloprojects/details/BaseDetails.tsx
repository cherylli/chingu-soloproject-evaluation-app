'use client';

import { BaseDetailHeader } from '@/components/soloprojects/details/BaseDetailsHeader';
import DeveloperDetails from '@/components/soloprojects/details/Developer';
import PODetails from '@/components/soloprojects/details/PODetails';
import SMDetails from '@/components/soloprojects/details/SMDetails';
import UIUXDetails from '@/components/soloprojects/details/UIUXDetails';
import DiscordDMSheet from '@/components/soloprojects/DiscordDMSheet';
import TierSuggestion from '@/components/soloprojects/tiers/TierSuggestion';
import { Button } from '@/components/ui/button';
import ButtonIconWithAction from '@/components/ui/buttons/ButtonIconWithAction';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import MemberProfileLinkButton from '@/components/ui/navigation/MemberProfileLinkButton';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useRoleCheck } from '@/hooks/useRoleCheck';
import { getRandomPassMessage } from '@/lib/getRandomPassMessage';
import { getRole } from '@/lib/getRole';
import { evalStatusValues } from '@/lib/options';
import { cn } from '@/lib/utils';
import { sendMessageToDiscordRingTheBell } from '@/services/discord';
import {
  removeEvaluatorOnDb,
  setEvaluatorOnDb,
  updateSoloProjectById,
} from '@/services/soloProjects';
import {
  EvaluationStatus,
  SoloProjectFields,
  SoloProjectSubmission,
  VoyageRole,
} from '@/types/SoloProjectTypes';
import { SiAirtable } from '@icons-pack/react-simple-icons';
import {
  Check,
  ChevronsUpDown,
  Copy,
  PencilLine,
  SaveIcon,
  SendIcon,
  XCircle,
} from 'lucide-react';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-hot-toast';

interface ProjectDetailProps {
  record: SoloProjectSubmission;
  atBaseUrl: string;
}

const ProjectSubmissionDetail = ({
  record: initialRecord,
  atBaseUrl,
}: ProjectDetailProps) => {
  const [statusOpen, setStatusOpen] = useState(false);
  const [ringTheBellText, setRingTheBellText] =
    useState('');
  const [selectionLen, setSelectionLen] = useState(0);
  const [record, setRecord] =
    useState<SoloProjectSubmission>(initialRecord);

  const { isAdmin } = useRoleCheck();

  if (!record) return;

  // optional Evaluation Status for autosave on Evaluation Status change
  // due to react state update async issue
  // otherwise, just use what's in the record state
  const handleSave = async (
    evaluationStatus: EvaluationStatus = record.fields[
      'Evaluation Status'
    ]
  ) => {
    const savingToast = toast.loading('Saving...');
    const res = await updateSoloProjectById(record.id, {
      'Evaluation Feedback':
        record.fields['Evaluation Feedback'],
      'Evaluation Status': evaluationStatus,
    });
    if (res.success) {
      toast.success(
        `Saved. Status: ${res.data?.fields['Evaluation Status']}`
      );
    } else {
      toast.error(`Error Saving: ${res.message}`);
    }
    toast.dismiss(savingToast);
  };

  const handleSetEvaluator = async () => {
    const setEvaluatorToast = toast.loading(
      'Setting Evaluator...'
    );
    const res = await setEvaluatorOnDb(record.id);
    if (res.success) {
      updateRecordFields(
        'Evaluator',
        res.data?.fields.Evaluator as string
      );
      toast.success(
        `Evaluator set to ${res.data?.fields.Evaluator}`
      );
    } else {
      toast.error(`Set Evaluator FAILED: ${res.message}`);
    }
    toast.dismiss(setEvaluatorToast);
  };

  const handleRemoveEvaluator = async () => {
    const removeEvaluatorToast = toast.loading(
      'Removing Evaluator...'
    );
    const res = await removeEvaluatorOnDb(record.id);
    if (res.success) {
      updateRecordFields('Evaluator', '');
      toast.success('Removed Evaluator');
    } else {
      toast.error(
        `Remove evaluator FAILED: ${res.message}`
      );
    }
    toast.dismiss(removeEvaluatorToast);
  };

  const handleEvaluationStatusChange = async (
    statusValue: EvaluationStatus
  ) => {
    if (statusValue === 'Passed') {
      onPassSelect();
    }
    updateRecordFields('Evaluation Status', statusValue);
    setStatusOpen(false);

    await handleSave(statusValue);
  };

  const handleSendRingTheBellMessage = async () => {
    const sendPromise =
      sendMessageToDiscordRingTheBell(ringTheBellText);

    toast.promise(sendPromise, {
      loading:
        'Sending message to discord #ring-the-bell channel...',
      success: 'Sent!',
      error: 'Error Sending!',
    });
  };

  const onPassSelect = () => {
    setRingTheBellText(
      getRandomPassMessage(record.fields['Discord ID'])
    );
  };

  const onSelectText = () => {
    const selection = window.getSelection()?.toString();
    if (selection && selection !== '') {
      setSelectionLen(selection.length);
    } else {
      setSelectionLen(0);
    }
  };

  const getRoleComponent = (role: VoyageRole) => {
    switch (role) {
      case 'Software Developer':
      case 'Developer':
        return <DeveloperDetails fields={record.fields} />;
      case 'Scrum Master':
        return <SMDetails fields={record.fields} />;
      case 'Product Owner':
        return <PODetails fields={record.fields} />;
      case 'UI/UX Designer':
      case 'UI / UX Designer':
      case 'UI/UX':
        return <UIUXDetails fields={record.fields} />;
      case 'Data Scientist':
        return <DeveloperDetails fields={record.fields} />;
    }
  };

  const updateRecordFields = (
    field: keyof SoloProjectFields,
    value: string
  ) => {
    setRecord({
      ...record,
      fields: {
        ...record.fields,
        [field]: value,
      },
    });
  };

  return (
    <>
      <div>
        <section className="flex flex-col gap-5 w-[90%] mx-auto">
          <BaseDetailHeader record={record} />
          <div className="flex gap-5 items-center">
            {isAdmin && (
              <a
                href={`${atBaseUrl}/${record.id}`}
                target="_blank"
                rel="noreferrer"
              >
                <SiAirtable />
              </a>
            )}
            <MemberProfileLinkButton
              discordId={record.fields['Discord ID']}
            />
            <div>
              {record.fields['Timestamp'].toString()}
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <div>{record.fields.Tier}</div>
            <TierSuggestion
              onSuccess={updateRecordFields}
            />
          </div>

          {record.fields['Instructions'] ? (
            <div>
              <div className="text-gray-500">
                Instructions:
              </div>
              <div>{record.fields['Instructions']} </div>
            </div>
          ) : null}
          {record.fields['Addl. Comments'] ? (
            <div>
              <div className="text-gray-500">
                Additional Comments:
              </div>
              <div>{record.fields['Addl. Comments']} </div>
            </div>
          ) : null}

          <div className="flex">
            <div className="mr-3">Evaluator:</div>
            <div>{record.fields.Evaluator}</div>
            {record.fields.Evaluator && (
              <XCircle
                color="#A30000"
                className="ml-2 cursor-pointer"
                onClick={handleRemoveEvaluator}
              />
            )}
          </div>

          <Button
            className="bg-green-700 light:text-white-200 hover:bg-green-900 disabled:bg-gray-500"
            disabled={!!record.fields.Evaluator}
            onClick={handleSetEvaluator}
          >
            <PencilLine className="mr-2 h-4 w-4" />
            Evaluate This
          </Button>

          {getRoleComponent(getRole(record.fields))}

          <Textarea
            className="h-[500px]"
            value={record.fields['Evaluation Feedback']}
            onChange={(e) =>
              updateRecordFields(
                'Evaluation Feedback',
                e.target.value
              )
            }
            onMouseUp={onSelectText}
          />
          <div className="text-right text-gray-500">
            {selectionLen}/
            {record.fields['Evaluation Feedback']?.length ??
              '0'}
          </div>

          <div className="flex gap-5 items-center">
            <div>Evaluation Status</div>
            <Popover
              open={statusOpen}
              onOpenChange={setStatusOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={statusOpen}
                  className="w-[200px] justify-between"
                >
                  {record.fields['Evaluation Status']}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search status..." />
                  <CommandEmpty>
                    No status found.
                  </CommandEmpty>
                  <CommandGroup>
                    {evalStatusValues.map((status) => (
                      <CommandItem
                        key={status.value}
                        onSelect={() =>
                          handleEvaluationStatusChange(
                            status.value
                          )
                        }
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            record.fields[
                              'Evaluation Status'
                            ] === status.value
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {status.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          {record.fields['Evaluation Status'] ===
          'Passed' ? (
            <div className="whitespace-pre-line">
              {ringTheBellText}
              <CopyToClipboard text={ringTheBellText}>
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-2 h-8 w-8 cursor-pointer"
                  onClick={() => toast('Copied!')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </CopyToClipboard>
              <ButtonIconWithAction
                className="ml-2"
                Icon={SendIcon}
                onClick={handleSendRingTheBellMessage}
                tooltip="Send to Discord"
              />
            </div>
          ) : null}
          <Button
            className="cursor-pointer"
            onClick={() => handleSave()}
          >
            <SaveIcon /> Save
          </Button>
        </section>
      </div>
      <DiscordDMSheet
        discordId={record.fields['Discord ID']}
      />
    </>
  );
};

export default ProjectSubmissionDetail;
