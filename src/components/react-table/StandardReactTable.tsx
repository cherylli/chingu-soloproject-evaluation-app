import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {type Table as TanstackTable, flexRender} from "@tanstack/react-table";

const StandardReactTable= <T,> ({
    table
}:{
    table: TanstackTable<T>;
}) => {
    return <div>
        <Table className="border my-6">
            <TableHeader>
                <>
                    {table.getHeaderGroups().map((headerGroup) => <TableRow key={headerGroup.id}>
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
                {table.getRowModel().rows.map((row) => (
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

 export default StandardReactTable