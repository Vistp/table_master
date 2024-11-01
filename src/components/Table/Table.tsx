import { DataRow, TableProps } from '../../types/types';
import { useDispatch } from 'react-redux';
import { requestSort, toggleRowSelection } from '../../store/tableSlice';
import s from './Table.module.css';

const Table = <T extends DataRow>({ columns, sortedData, selectedRowIds }: TableProps<T>) => {
  const dispatch = useDispatch();

  return (
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
  );
};

export default Table;