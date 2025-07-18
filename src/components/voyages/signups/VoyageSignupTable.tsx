'use client'
import {VoyageSignup} from "@/types/VoyageSignupTypes";
import {useReactTable} from "@tanstack/react-table";
import {getCoreRowModel} from "@tanstack/table-core";
import {voyageSignupColumnDef} from "@/components/voyages/signups/SignupColDef";
import StandardReactTable from "@/components/react-table/StandardReactTable";

const VoyageSignupTable = ({
        records,
        atBaseUrl,
    }: {
        records: VoyageSignup[]
        atBaseUrl: string
    }
) => {
    const table = useReactTable<VoyageSignup>({
        data: records,
        columns: voyageSignupColumnDef(atBaseUrl),
        getCoreRowModel: getCoreRowModel<VoyageSignup>()
    })
    return <StandardReactTable table={table}/>
}

export default VoyageSignupTable