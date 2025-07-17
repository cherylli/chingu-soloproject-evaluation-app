'use client'

import {SoloProjectTier, Submission} from "@/types/SoloProjectTypes";
import {useReactTable} from "@tanstack/react-table";
import {tierMismatchColumnDef} from "@/components/soloprojects/tiers/tierMismatchColumnDef";
import {getCoreRowModel} from "@tanstack/table-core";
import StandardReactTable from "@/components/react-table/StandardReactTable";
import {useState} from "react";

const TierMismatchTable = ({records}:{records:Submission[]}) => {
    const [data, setData] = useState(records)

    const refreshRow = (rowId: string, newTier: SoloProjectTier)=> {
        console.log(rowId, newTier)
        setData(prev=>
            prev.map(row=>row.id === rowId ?
                {...row,
                fields: {
                    ...row.fields,
                    Tier: newTier
                }}: row
            )
        )
    }

    const table = useReactTable<Submission>({
        data,
        columns: tierMismatchColumnDef(refreshRow),
        getCoreRowModel: getCoreRowModel<Submission>()
    })

    return <StandardReactTable table={table} />
 }
 
 export default TierMismatchTable