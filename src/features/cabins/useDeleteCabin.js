import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteCabin as deleteCabinApi } from '../../services/apiCabins';

export function useDeleteCabin() {
  /*eslint-disable */
  const queryClient = useQueryClient();
  const { isLoading: isDeleteing, mutate: deleteCabin } = useMutation({
    mutationFn: (id) => deleteCabinApi(id),
    onSuccess: () => {
      toast.success('Cabin Successfully deleted');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { isDeleteing, deleteCabin };
}
