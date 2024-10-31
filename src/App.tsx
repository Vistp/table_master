import React from "react";
import Table from "./components/Table/Table";

interface DataRow extends Record<string, unknown> {
  id: number;
  name: string;
  num: number;
}

interface Column<T> {
  header: string;
  accessor: keyof T;
}

const App: React.FC = () => {
  const data: DataRow[] = Array.from({ length: 15 }, (_, index) => ({
    id: index + 1,
    name: `Объект ${index + 1}`,
    num: Math.floor(Math.random() * 100),
  }));

  const columns: Column<DataRow>[] = [
    { header: "ID", accessor: "id" },
    { header: "Объект", accessor: "name" },
    { header: "Значение", accessor: "num" },
  ];

  const handleRowClick = (row: DataRow) => {
    console.log("Кликнули на строку:", row.id);
  };

  return (
    <div>
      <h2>Таблица</h2>
      <Table columns={columns} data={data} onRowClick={handleRowClick} />
    </div>
  );
};

export default App;
