import { urlLinkParser } from '@/lib/urlLinkParser';
import { SoloProjectFields } from '@/types/SoloProjectTypes';
import Link from 'next/link';

const UIUXDetails = ({
  fields,
}: {
  fields: SoloProjectFields;
}) => {
  const parsedProjectUrl = urlLinkParser(
    fields['UI/UX Project URL']
  );
  return (
    <table className="table-auto">
      <thead></thead>
      <tbody>
        <tr>
          <td>UI/UX Project URL: </td>
          {parsedProjectUrl ? (
            <td className="px-4 text-blue-500 hover:underline">
              <Link
                href={parsedProjectUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {fields['UI/UX Project URL']}
              </Link>
            </td>
          ) : (
            <td className="px-4">
              {fields['UI/UX Project URL']}
            </td>
          )}
        </tr>
      </tbody>
    </table>
  );
};

export default UIUXDetails;
