import { useSearchParams } from 'react-router-dom';
import Select from './Select';
/*eslint-disable*/
function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || 'startDate-asc';

  function handleChange(e) {
    console.log(e.target.value);
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }

  return <Select options={options} onChange={handleChange} value={sortBy} />;
}

export default SortBy;
