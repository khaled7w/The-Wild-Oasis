import styled from 'styled-components';
/*eslint-disable*/
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from '../bookings/useBooking';
import Spinner from '../../ui/Spinner';
import Checkbox from '../../ui/Checkbox';
import { useEffect, useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { useChecking } from './useChecking';
import { useSettings } from '../settings/useSettings';

/*eslint-disable*/
const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmed, setConfirmed] = useState(false);
  const [breakfast, setBreakfast] = useState(false);

  const { booking, isLoading: isLoadingBooking } = useBooking();
  const { checkin, isCheckingIn } = useChecking();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  const moveBack = useMoveBack();

  useEffect(() => {
    if (booking) {
      setConfirmed(booking.isPaid);
    }
  }, [booking]);

  if (isLoadingBooking || isLoadingSettings) return <Spinner />;

  if (!booking) return null; // Handle case where booking is not available

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const { breakfastPrice } = settings || {};
  const optionalBreakfast = breakfastPrice
    ? breakfastPrice * numNights * numGuests
    : 0;

  function handleCheckin() {
    if (!confirmed) return;
    if (breakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfast,
          totalPrice: totalPrice + optionalBreakfast,
        },
      });
    } else {
      checkin(bookingId, {});
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Checkbox
          checked={breakfast}
          onChange={() => {
            setBreakfast((prev) => !prev);
            setConfirmed(false);
          }}>
          Do you want breakfast for {formatCurrency(optionalBreakfast)}?
        </Checkbox>
      )}

      <Checkbox
        checked={confirmed}
        onChange={() => setConfirmed((prev) => !prev)}
        disabled={confirmed || isCheckingIn}>
        I confirm that {guests.fullName} has paid the total amount{' '}
        {!breakfast
          ? formatCurrency(totalPrice)
          : `${formatCurrency(
              totalPrice + optionalBreakfast
            )} :${formatCurrency(totalPrice)} + ${formatCurrency(
              optionalBreakfast
            )}`}
      </Checkbox>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmed || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
