import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Column } from '@tanstack/table-core';

export function ColumnToggle<T>({
  columns,
}: {
  columns: Column<T>[];
}) {
  return (
    <div className="flex gap-2">
      {columns.map((column) => {
        return (
          <div
            key={column.id}
            className="flex items-center gap-2"
          >
            <Checkbox
              id={`vs-${column.id}`}
              checked={column.getIsVisible()}
              onCheckedChange={(e) =>
                column.toggleVisibility()
              }
            />
            <Label htmlFor={`vs-${column.id}`}>
              {column.id}
            </Label>
          </div>
        );
      })}
    </div>
  );
}
