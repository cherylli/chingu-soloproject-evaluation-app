import { Button } from '@/components/ui/button';
import { getRole } from '@/lib/getRole';
import { roleColors } from '@/styles/roles';
import { SoloProjectSubmission } from '@/types/SoloProjectTypes';
import { AtSign, Copy, Github } from 'lucide-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-hot-toast';

export const BaseDetailHeader = ({ record }: { record: SoloProjectSubmission }) => {
  return (
    <header className="flex flex-col">
      <div className="flex flex-row items-center justify-center m-2">
        <h1 className="text-2xl">{record.fields['Discord Name'] ?? 'Discord ID not Provided'}</h1>
        <CopyToClipboard text={record.fields['Discord Name']}>
          <Button
            variant="outline"
            size="icon"
            className="ml-2 h-8 w-8"
            onClick={() => toast('Copied!')}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </CopyToClipboard>
      </div>
      {record.fields['Discord ID'] ? (
        <p className="flex">
          <AtSign className="mr-2" />
          {record.fields['Discord ID']}
          <CopyToClipboard text={`<@${record.fields['Discord ID']}>`}>
            <Button
              variant="outline"
              size="icon"
              className="ml-2 h-8 w-8"
              onClick={() => toast('Copied!')}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </CopyToClipboard>
        </p>
      ) : null}
      {record.fields['GitHub ID'] ? (
        <p className="flex">
          <Github className="mr-2" />
          {record.fields['GitHub ID']}
        </p>
      ) : null}

      {getRole(record.fields) ? (
        <div className={`text-center ${roleColors[getRole(record.fields)]?.bg} py-1 mt-3`}>
          {`${getRole(record.fields)} ${record.fields['Role Type'] ? `(${record.fields['Role Type']})` : ''} `}
        </div>
      ) : (
        <div className="text-center text-gray-800 bg-gray-300 py-1 mt-3">No Role Selected</div>
      )}
    </header>
  );
};
