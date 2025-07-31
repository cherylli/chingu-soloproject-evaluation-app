import {createColumnHelper} from "@tanstack/table-core";
import {VoyageSignup} from "@/types/VoyageSignupTypes";
import {SiAirtable} from "@icons-pack/react-simple-icons";

const columnHelper = createColumnHelper<VoyageSignup>()


export const voyageSignupColumnDef = (
    baseURL: string
) => [
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
    columnHelper.accessor((row) => row.fields["Voyage"], {
        header: "Voyage",
    })
]