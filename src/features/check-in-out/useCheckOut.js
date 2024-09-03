import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useCheckOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkOut, isLoading } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: 'checked-out' }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.bookingId} successfully checked out`),
        queryClient.invalidateQueries({ active: true });
      navigate('/');
    },

    onError: () => toast.error('There was an error while checking out '),
  });
  return { checkOut, isLoading };
}
