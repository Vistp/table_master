export interface DataRow {
  id: number;
  name: string;
  num: number;
}

export interface Column<T> {
  header: string;
  accessor: keyof T;
}

export interface TableProps<T> {
  columns: Column<T>[];
  sortedData: T[];
  selectedRowIds: number[];
}