import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Logout as logoutApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isloading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/login', { replace: true });
    },
  });

  return { logout, isloading };
}
