import { FC, ReactElement } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

interface Props {
  children: ReactElement;
}

const RequireAuth: FC<Props> = ({ children }) => {
  const data = JSON.parse(localStorage.getItem('data') || '');
  const location = useLocation();

  if (!data) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
