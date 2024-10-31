import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter, requestSort, selectRow } from '../../store/tableSlice';

interface DataRow {
    id: number;
    name: string;
    num: number;
  }
  
interface Column<T> {
    header: string;
    accessor: keyof T;
}

  const Table = <T extends DataRow>({ columns }: { columns: Column<T>[] }) => {
  const dispatch = useDispatch();

  const filter = useSelector((state: { table: { filter: string } }) => state.table.filter);
  const sortConfig = useSelector((state: { table: { sortConfig: { key: keyof T | null; direction: 'ascending' | 'descending' | null } } }) => state.table.sortConfig);
  const data = useSelector((state: { table: { data: T[] } }) => state.table.data);
  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(filter.toLowerCase())
    )
  );

  const sortedData = React.useMemo(() => {
    let sortableItems = [...filteredData];
    
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (sortConfig.key && a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (sortConfig.key && a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortableItems;
  }, [filteredData, sortConfig]);

  return (
    <div>
      <input
        type='text'
        placeholder='Фильтрация...'
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
      />
      <table className='table'>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                onClick={() => dispatch(requestSort(column.accessor as keyof DataRow))}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr 
                key={row.id}
                onClick={() => dispatch(selectRow(row.id))}
            >
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