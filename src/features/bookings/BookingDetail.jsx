import styled from 'styled-components';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from './useBooking';
import Spinner from '../../ui/Spinner';
import { useNavigate } from 'react-router-dom';
import useCheckOut from '../check-in-out/useCheckOut';
import useDeleteBooking from './useDeleteBooking';
import Empty from '../../ui/Empty';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading, booking } = useBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const { checkOut, isLoading: isLoadingCheckout } = useCheckOut();

  // const status = 'checked-in';

  const { deleteBook, isLoading: isDeletingBooking } = useDeleteBooking();
  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;

  const { id: bookingId, status } = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  function handleDeleteBooking() {
    deleteBook(bookingId);
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>

        {status === 'unconfirmed' && (
          <Button onClick={navigate(`checkin/${bookingId}`)}>Check In</Button>
        )}

        {status === 'checked-in' && (
          <Button
            onClick={() => checkOut(bookingId)}
            disabled={isLoadingCheckout}>
            Check out
          </Button>
        )}

        <Button
          variation="danger"
          onClick={handleDeleteBooking}
          disabled={isDeletingBooking}>
          Delete
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
