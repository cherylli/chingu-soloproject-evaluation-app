import { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import PaginationButtons from './PaginationButtons';

// ✅ Storybook metadata
const meta: Meta<typeof PaginationButtons> = {
  title: 'UI/Buttons/PaginationButtons',
  component: PaginationButtons,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PaginationButtons>;

// ✅ Example data
type Person = { id: number; name: string };
const data: Person[] = Array.from({ length: 25 }).map(
  (_, i) => ({
    id: i + 1,
    name: `Person ${i + 1}`,
  })
);

// ✅ Example columns (minimal)
const columns: ColumnDef<Person>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
];

// ✅ Mock table container for demo
const TableDemo = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
  });

  const currentRows = table
    .getPaginationRowModel()
    .rows.map((row) => row.original);

  return (
    <div className="p-6 space-y-4 border rounded-md shadow-sm max-w-md mx-auto">
      <table className="w-full text-sm border-collapse border">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-2 border text-left"
                >
                  {header.column.columnDef.header as string}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {currentRows.map((row) => (
            <tr key={row.id}>
              <td className="p-2 border">{row.id}</td>
              <td className="p-2 border">{row.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <PaginationButtons table={table} />
    </div>
  );
};

// ✅ Story
export const Default: Story = {
  render: () => <TableDemo />,
};
