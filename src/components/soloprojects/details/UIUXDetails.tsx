import { urlLinkParser } from '@/lib/urlLinkParser';
import { SoloProjectFields } from '@/types/SoloProjectTypes';
import Link from 'next/link';

const UIUXDetails = ({
  fields,
}: {
  fields: SoloProjectFields;
}) => {
  return (
    <table className="table-auto">
      <thead></thead>
      <tbody>
        <tr>
          <td>UI/UX Project URL: </td>
          <td className="px-4 text-blue-500 hover:underline">
            <Link
              href={urlLinkParser(
                fields['UI/UX Project URL']
              )}
              target="_blank"
              rel="noopener noreferrer"
            >
              {fields['UI/UX Project URL']}
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default UIUXDetails;
