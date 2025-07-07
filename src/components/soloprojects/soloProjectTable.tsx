'use client'

import {Submission} from "@/types/SoloProjectTypes";

import {columnDef} from "@/components/soloprojects/columnDef";
import {getCoreRowModel} from "@tanstack/table-core";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {flexRender, useReactTable} from "@tanstack/react-table";


const SoloProjectTable = ({records}: { records: Submission[] }) => {

    const spTable = useReactTable<Submission>({
        data: records,
        columns: columnDef,
        getCoreRowModel: getCoreRowModel<Submission>()

    })

    return <div>
        <Table className="border my-6">
            <TableHeader>
                <>
                    {spTable.getHeaderGroups().map((headerGroup) => <TableRow key={headerGroup.id}>
                            <>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        <div>
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                        </div>
                                    </TableHead>
                                ))}
                            </>

                        </TableRow>
                    )}
                </>

            </TableHeader>
            <TableBody>

                {spTable.getRowModel().rows.map((row) => (

                    <TableRow key={row.id}>

                        {row.getVisibleCells().map(cell => (
                            <TableCell key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </TableCell>
                        ))}


                    </TableRow>


                ))}


            </TableBody>
        </Table>
    </div>
}

export default SoloProjectTable