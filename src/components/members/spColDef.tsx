import {createColumnHelper} from "@tanstack/table-core";
import {Submission} from "@/types/SoloProjectTypes";
import ReactTableRoleCell from "@/components/react-table/cells/Role";
import AirtableLinkCell from "@/components/react-table/cells/AirtableLink";

const columnHelper = createColumnHelper<Submission>()

export const spColDef = (
    baseURL: string
) => [
    columnHelper.display({
        id: "Airtable Link",
        cell: ({row}) => {
            return <AirtableLinkCell
                row={row}
                baseUrl={baseURL}
            />
        }
    }),
    columnHelper.accessor((row) => row.fields["Discord Name"], {
        id: "Discord Name",
        header: "Discord Name",
    }),
    columnHelper.accessor((row) => row.fields["Email"], {
        id: "Email",
        header: "Email"
    }),
    columnHelper.accessor((row) => row.fields["Role"], {
        id: "Role",
        header: "Role",
        cell: ({row}) =>
            <ReactTableRoleCell row={row} />
    }),
    columnHelper.accessor((row) => row.fields["Role Type"], {
        id: "Role Type",
    })
]