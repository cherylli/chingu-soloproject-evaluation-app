import { getRole } from '@/lib/getRole';
import { roleColors } from '@/styles/roles';
import { SoloProjectSubmission } from '@/types/SoloProjectTypes';
import { Row } from '@tanstack/table-core';

// TODO: update this component so it works with Role fields from all tables
const ReactTableRoleCell = ({ row }: { row: Row<SoloProjectSubmission> }) => {
  const role = getRole(row.original.fields);
  if (!role) return null;
  const className = roleColors[role]?.text ?? '';
  return <span className={className}>{role}</span>;
};

export default ReactTableRoleCell;
