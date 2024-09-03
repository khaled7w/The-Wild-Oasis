import styled from 'styled-components';
import useUser from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

/*eslint-disable*/
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1 . Load the authenticated user
  const { isLoading, user, isAuthenticated } = useUser();
  //2 . While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  console.log(user);
  //3. If there is NO authenticated user, redirect to the /login
  if (!isAuthenticated) return navigate('/login');
  //4. If there is a user , render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
