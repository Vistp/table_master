import React, { useEffect } from 'react';
import { DataRow, Column } from './types/types';
import { useDispatch } from 'react-redux';
import { setData } from './store/tableSlice';
import Table from './components/TableData';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const data: DataRow[] = Array.from({ length: 15 }, (_, index) => ({
      id: index + 1,
      name: `Объект ${index + 1}`,
      num: Math.floor(Math.random() * 100),
    }));
    dispatch(setData(data));
  }, [dispatch]);

  const columns: Column<DataRow>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Объект', accessor: 'name' },
    { header: 'Значение', accessor: 'num' },
  ];

  return (
    <div>
      <Table columns={columns} />
    </div>
  );
};

export default App;
