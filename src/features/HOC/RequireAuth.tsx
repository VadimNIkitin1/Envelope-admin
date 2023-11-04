import { FC, ReactElement } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Props {
  children: ReactElement;
}

const RequireAuth: FC<Props> = ({ children }) => {
  const location = useLocation();
  const data = useLocalStorage('data', '');

  if (!data) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
