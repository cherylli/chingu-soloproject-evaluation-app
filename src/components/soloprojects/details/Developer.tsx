import { SoloProjectFields } from '@/types/SoloProjectTypes';
import Link from 'next/link';

const DeveloperDetails = ({ fields }: { fields: SoloProjectFields }) => {
  return (
    <table className="table-auto">
      <thead></thead>
      <tbody>
        <tr>
          <td>Deployed App URL:</td>
          <td className="px-4 text-blue-500 hover:underline">
            <Link href={fields['Deployed App URL']} target="_blank" rel="noopener noreferrer">
              {fields['Deployed App URL']}
            </Link>
          </td>
        </tr>
        <tr>
          <td>Github Repo URL:</td>
          <td className="px-4 text-blue-500 hover:underline">
            <Link href={fields['GitHub Repo URL']} target="_blank" rel="noopener noreferrer">
              {fields['GitHub Repo URL']}
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default DeveloperDetails;
