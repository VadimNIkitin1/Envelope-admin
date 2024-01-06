import { FC, ReactElement } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

interface Props {
  children: ReactElement;
}

const RequireAuth: FC<Props> = ({ children }) => {
  const location = useLocation();
  const data = localStorage.getItem('data') || '';

  if (!data) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export { RequireAuth };
