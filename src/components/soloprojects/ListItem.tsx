import {FilteredFields} from "@/types/SoloProjectTypes";
import Link from "next/link";
import {roleColors} from "@/styles/roles";

const SoloProjectsListItem = ({fields, id}:{fields:FilteredFields, id:string}) => {
    return(
        <tr>
            <td className="cursor-pointer border-b px-8 py-4">
                <Link href={`/solo-project/${id}`}>
                    {fields["Discord Name"]}
                </Link>
            </td>
            <td className={`border-b px-8 py-4 ${roleColors[fields["Voyage Role (from Applications link)"]].text}`}>
                {fields["Voyage Role (from Applications link)"]}
            </td>
            <td className="border-b px-8 py-4">{fields.Tier.substring(0,7)}</td>
            <td className="border-b px-8 py-4">{fields.Evaluator}</td>
        </tr>
    )
 }

 export default SoloProjectsListItem