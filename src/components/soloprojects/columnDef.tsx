import {createColumnHelper} from "@tanstack/table-core";
import {Submission} from "@/types/SoloProjectTypes";
import {roleColors} from "@/styles/roles";
import {getRole} from "@/lib/getRole";
import Link from "next/link";
import {SiAirtable} from "@icons-pack/react-simple-icons";


const columnHelper = createColumnHelper<Submission>()

export const columnDef = (
    baseURL: string,
    isAdmin: boolean = false
) => [
    ...(isAdmin ?
    [columnHelper.display({
        id: "Airtable Link",
        cell: ({row}) => {
            return <a href={`${baseURL}/${row.original.id}`} target="_blank" rel="noreferrer">
                <SiAirtable />
            </a>
        }
    })]:[]),
    columnHelper.accessor((row) => row.fields["Discord Name"], {
        id: "Discord Name",
        header: "Discord Name",
        cell: ({getValue, row}) => {
            return <Link href={`/solo-project/${row.original.id}`}>
                {getValue()}
                <span className="text-red-700">
                    {row.original.commentCount > 0 && ` ( ${row.original.commentCount} )` }
                </span>
            </Link>
        }
    }),
    columnHelper.accessor((row) => row.fields["Role"], {
        id: "Role",
        header: "Role",
        cell: ({row}) => {
            // voyage roles are from "Voyage Role (from Applications link)" for older records
            const role = getRole(row.original.fields)
            const className = roleColors[role]?.text ?? "";
            return <span className={className}>
                    {role}
                </span>
        }
    }),
    columnHelper.accessor((row) => row.fields["Role Type"], {
        id: "Role Type",
        header: "Role Type",
    }),
    columnHelper.accessor((row) => row.fields["Tier"]?.substring(0, 7), {
        id: "Tier",
        header: "Tier"
    }),
    columnHelper.accessor((row) => row.fields["Evaluator"], {
        id: "Evaluator",
        header: "Evaluator"
    })
]