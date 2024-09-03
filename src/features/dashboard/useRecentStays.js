import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '../../services/apiBookings';
import { useQuery } from '@tanstack/react-query';

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get('last')
    ? Number(searchParams.get('last'))
    : 7;

  const queryData = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryData),
    queryKey: ['stays', `last-${numDays}`],
  });

  const confirmedStatus = stays?.filter(
    (stay) => stay.status === 'checked-out' || stay.status === 'checked-in'
  );

  return { isLoading, stays, confirmedStatus, numDays };
}
