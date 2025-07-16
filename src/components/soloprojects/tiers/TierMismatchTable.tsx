'use client'

import {Submission} from "@/types/SoloProjectTypes";
import {useReactTable} from "@tanstack/react-table";
import {tierMismatchColumnDef} from "@/components/soloprojects/tiers/tierMismatchColumnDef";
import {getCoreRowModel} from "@tanstack/table-core";
import StandardReactTable from "@/components/react-table/StandardReactTable";

const TierMismatchTable = ({records}:{records:Submission[]}) => {

    const table = useReactTable<Submission>({
        data: records,
        columns: tierMismatchColumnDef,
        getCoreRowModel: getCoreRowModel<Submission>()
    })

    return <StandardReactTable table={table} />
 }
 
 export default TierMismatchTable