import { Button } from '@/components/ui/button';
import { Table } from '@tanstack/table-core';

const PaginationButtons = <T,>({
  table,
}: {
  table: Table<T>;
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex basis-1/3 items-center">
        <p className="whitespace-nowrap font-bold">
          {`Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`}
          &nbsp;&nbsp;
          {`[${table.getFilteredRowModel().rows.length} ${table.getFilteredRowModel().rows.length !== 1 ? 'total records' : 'record'}]`}
        </p>
      </div>
      <div className="space-x-1">
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
export default PaginationButtons;
