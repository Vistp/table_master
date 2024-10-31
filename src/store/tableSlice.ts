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
  selectedRowIds: number[];
}

const initialState: TableState = {
  data: [],
  filter: '',
  sortConfig: { key: null, direction: null },
  selectedRowIds: [],
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
    toggleRowSelection(state, action: PayloadAction<number>) {
      const rowId = action.payload;
      if (state.selectedRowIds.includes(rowId)) {
        state.selectedRowIds = state.selectedRowIds.filter(id => id !== rowId);
      } else {
        state.selectedRowIds.push(rowId);
      }
    },
  },
});

export const { setData, setFilter, requestSort, toggleRowSelection } = tableSlice.actions;
export default tableSlice.reducer;