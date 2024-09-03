import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
/*eslint-disable*/
function Filter({ filterFeild, options }) {
  const [searchParams, setSearchParams] = useSearchParams('');
  // console.log(filterFeild);
  function handleClick(value) {
    searchParams.set(filterFeild, value);

    if (searchParams.get('page')) setSearchParams.set('page', 1);
    setSearchParams(searchParams);
  }
  const currentValue = searchParams.get(filterFeild);
  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          active={currentValue === option.value}
          disabled={currentValue === option.value}
          key={option.value}
          onClick={() => handleClick(option.value)}>
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
