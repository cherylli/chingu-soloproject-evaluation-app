import {FilteredFields} from "@/types/SoloProjectTypes";
import Link from "next/link";
import {roleColors} from "@/styles/roles";
import {TableCell, TableRow} from "@/components/ui/table";

const SoloProjectsListItem = (
    {fields, id, commentCount}:{fields:FilteredFields, id:string, commentCount: number}
) => {
    const projectRole = fields["Role"] || fields["Voyage Role (from Applications link)"]
    return(
        <TableRow>
            <TableCell>
                <Link href={`/solo-project/${id}`}>
                    {fields["Discord Name"]}
                    <span className="ml-2 text-orange-700">
                        {commentCount!==0?`( ${commentCount} )`:''}
                    </span>
                </Link>
            </TableCell>
            <TableCell className={`${roleColors[projectRole]?.text}`}>
                {projectRole}
            </TableCell>
            <TableCell>{fields.Tier.substring(0,7)}</TableCell>
            <TableCell>{fields.Evaluator}</TableCell>
        </TableRow>
    )
 }

 export default SoloProjectsListItem