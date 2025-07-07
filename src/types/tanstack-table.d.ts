declare module '@tanstack/react-table' {
    import {RowData} from "@tanstack/table-core";

    interface ColumnMeta<TData extends RowData, TValue> {
        classname: string
    }
}