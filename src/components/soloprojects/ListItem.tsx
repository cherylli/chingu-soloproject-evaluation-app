import {FilteredFields} from "@/types/SoloProjectTypes";
import Link from "next/link";
import {roleColors} from "@/styles/roles";
import {TableCell, TableRow} from "@/components/ui/table";

const SoloProjectsListItem = ({fields, id}:{fields:FilteredFields, id:string}) => {
    return(
        <TableRow>
            <TableCell>
                <Link href={`/solo-project/${id}`}>
                    {fields["Discord Name"]}
                </Link>
            </TableCell>
            <TableCell className={`${roleColors[fields["Voyage Role (from Applications link)"]].text}`}>
                {fields["Voyage Role (from Applications link)"]}
            </TableCell>
            <TableCell>{fields.Tier.substring(0,7)}</TableCell>
            <TableCell>{fields.Evaluator}</TableCell>
        </TableRow>
    )
 }

 export default SoloProjectsListItem