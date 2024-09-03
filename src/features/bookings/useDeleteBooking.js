import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteB } from '../../services/apiBookings';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useDeleteBooking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: deleteBook, isLoading } = useMutation({
    mutationFn: (bookingId) => deleteB(bookingId),
    onSuccess: (data) => {
      console.log(data);
      toast.success(`Successfully delete Booking#${data} `),
        queryClient.invalidateQueries({ queryKey: ['bookings'] });
      navigate('/');
    },
    onError: () => toast.error('Error while deleting booking'),
  });

  return { deleteBook, isLoading };
}
