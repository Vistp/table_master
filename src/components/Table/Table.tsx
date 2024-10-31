import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { requestSort, toggleRowSelection } from '../../store/tableSlice';
import FilterInput from '../FilterInput/FilterInput';
import s from './Table.module.css';

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
  const selectedRowIds = useSelector((state: { table: { selectedRowIds: number[] } }) => state.table.selectedRowIds);
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
      <FilterInput />
      <table className={s.table}>
        <thead>
          <tr>
            <th></th>
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
              onClick={() => dispatch(toggleRowSelection(row.id))}
            >
              <td>
                <input
                  type='checkbox'
                  checked={selectedRowIds.includes(row.id)}
                  onChange={() => dispatch(toggleRowSelection(row.id))}
                />
              </td>
              {columns.map((column) => (
                <td key={String(column.accessor)}>{String(row[column.accessor])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={s.statistics}>
        <span className={s.objectCount}>Объектов: {data.length}</span>
        <span>Показано объектов: {filteredData.length}</span>
      </div>
    </div>
  );
};

export default Table;