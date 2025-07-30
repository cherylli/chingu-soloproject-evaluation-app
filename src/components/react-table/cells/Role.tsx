import {Row} from "@tanstack/table-core";
import {Submission} from "@/types/SoloProjectTypes";
import {getRole} from "@/lib/getRole";
import {roleColors} from "@/styles/roles";

const ReactTableRoleCell = (
    {row}: { row: Row<Submission> }
) => {
    const role = getRole(row.original.fields)
    if (!role) return null;
    const className = roleColors[role]?.text ?? "";
    return (
        <span className={className}>
            {role}
        </span>
    )
};

export default ReactTableRoleCell;
