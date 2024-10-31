import React, { useState } from "react";

interface Column<T> {
  header: string;
  accessor: keyof T;
}

interface TableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

const Table = <T extends Record<string, unknown>>({ columns, data, onRowClick }: TableProps<T>) => {
  const [filter, setFilter] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "ascending" | "descending";
  } | null>(null);

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  );

  const sortedData = React.useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const requestSort = (key: keyof T) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Фильтрация..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                onClick={() => requestSort(column.accessor)}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr key={rowIndex} onClick={() => onRowClick && onRowClick(row)}>
              {columns.map((column) => (
                <td key={String(column.accessor)}>{String(row[column.accessor])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;