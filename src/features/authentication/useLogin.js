import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Login as loginApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      toast.success('Successfully Login'), navigate('/', { replace: true });
    },
    onError: () => toast.error('Failed to Login'),
  });

  return { login, isLoading, error };
}
