import {createColumnHelper} from "@tanstack/table-core";
import {VoyageSignup} from "@/types/VoyageSignupTypes";
import {SiAirtable} from "@icons-pack/react-simple-icons";
import {roleColors} from "@/styles/roles";

const columnHelper = createColumnHelper<VoyageSignup>()

export const singleVoyageColumnDef =(
    baseURL: string
) => [
    columnHelper.accessor((row) => row.fields["Team No."], {
        id: "teamNum",
        header: "Team",
        enableGrouping: true,
        enableSorting: true,
        getGroupingValue: (row) =>
            `${row.fields["Team Name"]} - ${row.fields["Team No."] || "no team"}`,
        // TODO: show how many active in the team
    }),
    columnHelper.display({
        id: "Links",
        cell: ({row}) => <div>
            <a href={`${baseURL}/${row.original.id}`} target="_blank" rel="noreferrer" >
                <SiAirtable/>
            </a>
        </div>

    }),
    columnHelper.accessor((row) => row.fields["Discord Name"], {
        header: "Discord Name",
    }),
    columnHelper.accessor((row) => row.fields["GitHub ID"], {
        header: "Github Id",
    }),
    columnHelper.accessor((row) => row.fields["Status"], {
        header: "Status",
    }),
    columnHelper.accessor((row)=>row.fields["Role"],{
        header: "Role",
        cell: ({row}) => {
            const classColor = row.original.fields.Status === "Active"
                ? roleColors[row.original.fields["Role"]].text
                : ""

            return <span className={classColor}>{row.original.fields["Role"]}</span>


        }
    })
]