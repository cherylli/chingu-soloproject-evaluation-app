import { urlLinkParser } from '@/lib/urlLinkParser';
import { SoloProjectFields } from '@/types/SoloProjectTypes';
import Link from 'next/link';

const DeveloperDetails = ({
  fields,
}: {
  fields: SoloProjectFields;
}) => {
  const parsedDeployedAppUrl = urlLinkParser(
    fields['Deployed App URL']
  );
  const parsedRepoUrl = urlLinkParser(
    fields['GitHub Repo URL']
  );
  return (
    <table className="table-auto">
      <thead></thead>
      <tbody>
        <tr>
          <td>Deployed App URL:</td>

          {parsedDeployedAppUrl ? (
            <td className="px-4 text-blue-500 hover:underline">
              <Link
                href={parsedDeployedAppUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {fields['Deployed App URL']}
              </Link>
            </td>
          ) : (
            <td className="px-4">
              {fields['Deployed App URL']}
            </td>
          )}
        </tr>
        <tr>
          <td>Github Repo URL:</td>

          {parsedRepoUrl ? (
            <td className="px-4 text-blue-500 hover:underline">
              <Link
                href={parsedRepoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {fields['GitHub Repo URL']}
              </Link>
            </td>
          ) : (
            <td className="px-4">
              {fields['GitHub Repo URL']}
            </td>
          )}
        </tr>
      </tbody>
    </table>
  );
};

export default DeveloperDetails;
