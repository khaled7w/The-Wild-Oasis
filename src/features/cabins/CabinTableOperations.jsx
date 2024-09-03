import TableOperations from '../../ui/TableOperations';
import Filter from '../../ui/Filter';
import SoryBy from '../../ui/SortBy';

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterFeild="discount"
        options={[
          { value: 'all', label: 'All' },
          { value: 'with-discount', label: 'With-Discount' },
          { value: 'no-discount', label: 'No-Discount' },
        ]}
      />
      <SoryBy
        options={[
          { value: 'name-asc', label: 'Sory by name (A-Z)' },
          { value: 'name-desc', label: 'Sory by name(Z-A)' },
          { value: 'regularPrice-asc', label: 'Sort by price (high first)' },
          { value: 'regularPrice-desc', label: 'Sort by price (low first)' },
          { value: 'maxCapctiy-asc', label: 'Sory by capactiy (high first)' },
          { value: 'maxCapctiy-desc', label: 'Sory by capactiy (low first)' },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
