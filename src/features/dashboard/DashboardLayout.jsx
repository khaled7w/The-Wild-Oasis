import styled from 'styled-components';
import { useRecentBookings } from './useRecentBookings';
import Spinner from '../../ui/Spinner';
import { useRecentStays } from './useRecentStays';
import Stats from './Stats';
import { useCabin } from '../cabins/useCabins';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';
import TodayActivity from '../check-in-out/TodayActivity';

/*eslint-disable*/
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isLoading1, bookings } = useRecentBookings();
  const {
    isLoading: isLoading2,
    stays,
    confirmedStatus,
    numDays,
  } = useRecentStays();
  const { cabins } = useCabin();
  if (isLoading1 || isLoading2) return <Spinner />;
  console.log(confirmedStatus);
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStatus}
        numDays={numDays}
        numCabins={cabins?.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStatus} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
