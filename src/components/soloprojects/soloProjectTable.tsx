'use client'

import {Submission} from "@/types/SoloProjectTypes";
import {columnDef} from "@/components/soloprojects/columnDef";
import {getCoreRowModel} from "@tanstack/table-core";
import {useReactTable} from "@tanstack/react-table";
import StandardReactTable from "@/components/react-table/StandardReactTable";
import {useSession} from "next-auth/react";


const SoloProjectTable = ({
        records, baseUrl
    }: {
        records: Submission[],
        baseUrl: string
    }
) => {

    const {data: sessionData } = useSession()
    const userRole = sessionData?.user?.roles || []
    const isAdmin = userRole.includes("admin")

    const spTable = useReactTable<Submission>({
        data: records,
        columns: columnDef(baseUrl, isAdmin),
        getCoreRowModel: getCoreRowModel<Submission>()
    })

    return <StandardReactTable table={spTable}/>
}

export default SoloProjectTable