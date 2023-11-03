import { FC, ReactElement } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

interface Props {
  children: ReactElement;
}

const RequireAuth: FC<Props> = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  console.log(!!token);

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
