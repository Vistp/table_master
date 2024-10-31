import { describe, it, expect } from 'vitest';
import tableReducer, { setData, setFilter, requestSort, toggleRowSelection } from './tableSlice';

describe('tableSlice', () => {
  const initialState = {
    data: [],
    filter: '',
    sortConfig: { key: null, direction: null },
    selectedRowIds: [],
  };

  it('должен возвращать начальное состояние', () => {
    expect(tableReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('должен обрабатывать setData', () => {
    const newData = [
      { id: 1, name: 'Объект 1', num: 76 },
      { id: 2, name: 'Объект 2', num: 12 },
    ];
    const nextState = tableReducer(initialState, setData(newData));
    expect(nextState.data).toEqual(newData);
  });

  it('должен обрабатывать setFilter', () => {
    const filterValue = 'А';
    const nextState = tableReducer(initialState, setFilter(filterValue));
    expect(nextState.filter).toBe(filterValue);
  });

  it('должен обрабатывать requestSort', () => {
    const key = 'num';
    const stateWithData = {
      ...initialState,
      data: [
        { id: 1, name: 'Объект 1', num: 76 },
        { id: 2, name: 'Объект 2', num: 12 },
      ],
    };

    let nextState = tableReducer(stateWithData, requestSort(key));
    expect(nextState.sortConfig).toEqual({ key: key, direction: 'ascending' });

    nextState = tableReducer(nextState, requestSort(key));
    expect(nextState.sortConfig).toEqual({ key: key, direction: 'descending' });
  });

  it('должен обрабатывать toggleRowSelection', () => {
    const rowId = 1;

    let nextState = tableReducer(initialState, toggleRowSelection(rowId));
    expect(nextState.selectedRowIds).toEqual([rowId]);

    nextState = tableReducer(nextState, toggleRowSelection(rowId));
    expect(nextState.selectedRowIds).toEqual([]);
  });

  it('должен обрабатывать toggleRowSelection для нескольких строк', () => {
    const rowId1 = 1;
    const rowId2 = 2;

    let nextState = tableReducer(initialState, toggleRowSelection(rowId1));
    expect(nextState.selectedRowIds).toEqual([rowId1]);

    nextState = tableReducer(nextState, toggleRowSelection(rowId2));
    expect(nextState.selectedRowIds).toEqual([rowId1, rowId2]);

    nextState = tableReducer(nextState, toggleRowSelection(rowId1));
    expect(nextState.selectedRowIds).toEqual([rowId2]);
    
    nextState = tableReducer(nextState, toggleRowSelection(rowId2));
    expect(nextState.selectedRowIds).toEqual([]);
  });
});