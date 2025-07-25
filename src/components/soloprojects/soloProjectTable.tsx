'use client'

import {Submission} from "@/types/SoloProjectTypes";

import {columnDef} from "@/components/soloprojects/columnDef";
import {getCoreRowModel} from "@tanstack/table-core";
import {useReactTable} from "@tanstack/react-table";
import StandardReactTable from "@/components/react-table/StandardReactTable";



const SoloProjectTable = ({records}: { records: Submission[] }) => {

    const spTable = useReactTable<Submission>({
        data: records,
        columns: columnDef,
        getCoreRowModel: getCoreRowModel<Submission>()
    })

    return <StandardReactTable table={spTable} />
}

export default SoloProjectTable