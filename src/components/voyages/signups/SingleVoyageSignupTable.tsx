'use client'

import {VoyageSignup} from "@/types/VoyageSignupTypes";
import {flexRender, getGroupedRowModel, getSortedRowModel, SortingState, useReactTable} from "@tanstack/react-table";
import {getCoreRowModel} from "@tanstack/table-core";
import {singleVoyageColumnDef} from "@/components/voyages/signups/singleVoyageColumnDef";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Fragment, useState} from "react";
import {ChevronDown, ChevronRight} from "lucide-react";
import {Button} from "@/components/ui/button";

const SingleVoyageSignupTable = ({
        records,
        atBaseUrl,
    }: {
        records: VoyageSignup[],
        atBaseUrl: string,
    }
) => {
    const [grouping, setGrouping] = useState(['teamNum'])
    const [sorting, setSorting] = useState<SortingState>([
        { id: 'teamNum', desc: false },
    ])

    const columns = singleVoyageColumnDef(atBaseUrl)

    const table = useReactTable<VoyageSignup>({
        data: records,
        columns,
        state: {
            grouping,
            sorting,
            columnVisibility: {
                teamNum: false,
            },
        },
        getCoreRowModel: getCoreRowModel<VoyageSignup>(),
        getGroupedRowModel: getGroupedRowModel<VoyageSignup>(),
        getSortedRowModel: getSortedRowModel<VoyageSignup>(),
    })

    return (
        <Table className="border">
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => <TableRow key={headerGroup.id}>
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
                    </TableRow>
                )}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows.map((row) => {
                        if (row.getIsGrouped()) {
                            return <Fragment key={row.id}>
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    <div>
                                        <Button
                                            variant="ghost" size="icon"
                                            onClick={row.getToggleExpandedHandler()}
                                        >
                                            {row.getIsExpanded()
                                                ? <ChevronDown size={16}/>
                                                : <ChevronRight size={16}/>
                                            }
                                        </Button>
                                        <strong>
                                            {String(row.getGroupingValue(row.groupingColumnId!) ?? '')} ({row.subRows.length})
                                        </strong>
                                    </div>
                                </TableCell>
                            </TableRow>
                            {row.getIsExpanded() &&
                                row.subRows.map((subRow) => (
                                    <TableRow key={subRow.id}>
                                        {subRow.getVisibleCells().map(cell => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            }
                            </Fragment>

                        }

                        return <TableRow key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    }
                )}
            </TableBody>
        </Table>
    )
}

export default SingleVoyageSignupTable