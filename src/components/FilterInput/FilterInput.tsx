import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../store/tableSlice';
import s from './FilterInput.module.css';

const FilterInput: React.FC = () => {
  const dispatch = useDispatch();
  
  const filter = useSelector((state: { table: { filter: string } }) => state.table.filter);

  return (
    <input
      type='text'
      placeholder='Фильтрация...'
      value={filter}
      onChange={(e) => dispatch(setFilter(e.target.value))}
      className={s.filterInput}
    />
  );
};

export default FilterInput;