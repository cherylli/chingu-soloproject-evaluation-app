import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { VoyageSignup } from '@/types/VoyageSignupTypes';
import { Column } from '@tanstack/table-core';

export const ColumnToggle = ({
  columns,
}: {
  columns: Column<VoyageSignup>[];
}) => {
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
};
