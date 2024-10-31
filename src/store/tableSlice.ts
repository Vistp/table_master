import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataRow {
  id: number;
  name: string;
  num: number;
}

interface TableState {
  data: DataRow[];
  filter: string;
  sortConfig: {
    key: keyof DataRow | null;
    direction: 'ascending' | 'descending' | null;
  };
  selectedRowId: number | null;
}

const initialState: TableState = {
  data: [],
  filter: '',
  sortConfig: { key: null, direction: null },
  selectedRowId: null,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setData(state, action: PayloadAction<DataRow[]>) {
      state.data = action.payload;
    },
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
    requestSort(state, action: PayloadAction<keyof DataRow>) {
      const key = action.payload;
      state.sortConfig.direction =
        state.sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
      state.sortConfig.key = key;
    },
    selectRow(state, action: PayloadAction<number>) {
        state.selectedRowId = action.payload;
        console.log(`Нажата строка: ${action.payload}`);
    },
  },
});

export const { setData, setFilter, requestSort, selectRow } = tableSlice.actions;
export default tableSlice.reducer;