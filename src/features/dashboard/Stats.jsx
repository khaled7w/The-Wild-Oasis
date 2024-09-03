import { HiOutlineBriefcase, HiOutlineChartBar } from 'react-icons/hi';
import Stat from './Stat';
import { HiOutlineBanknotes, HiOutlineCalendarDays } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';

/*eslint-disable*/
function Stats({ bookings, confirmedStays, numDays, numCabins }) {
  //1. number of bookings
  const numBookings = bookings?.length;
  // 2. total sales
  const sales = bookings.reduce((pre, cur) => pre + cur.totalPrice, 0);
  // 3. check ins
  const checkIns = confirmedStays.length;
  //4. occupations
  const occupation =
    confirmedStays.reduce((pre, cur) => pre + cur.numNights, 0) /
    (numCabins * numDays);
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBanknotes />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBriefcase />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + '%'}
      />
    </>
  );
}

export default Stats;
