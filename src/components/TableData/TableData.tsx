import React from 'react';
import { DataRow, Column } from '../../types/types';
import { useSelector } from 'react-redux';
import FilterInput from '../FilterInput/FilterInput';
import Table from '../Table';
import s from './TableData.module.css';

const TableData = <T extends DataRow>({ columns }: { columns: Column<T>[] }) => {
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
    <div className={s.container}>
      <h2>Таблица</h2>
      <FilterInput />
      <Table
        columns={columns}
        sortedData={sortedData}
        selectedRowIds={selectedRowIds}
      />
      <div className={s.statistics}>
        <span className={s.objectCount}>Объектов: {data.length}</span>
        <span>Показано объектов: {filteredData.length}</span>
      </div>
    </div>
  );
};

export default TableData;