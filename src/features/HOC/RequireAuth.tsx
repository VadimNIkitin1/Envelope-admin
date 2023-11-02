import { FC, ReactElement } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { useAppSelector } from '../../types/hooks';

interface Props {
  children: ReactElement;
}

const RequireAuth: FC<Props> = ({ children }) => {
  const company_id = localStorage.getItem('token');
  const location = useLocation();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  if (!isAuth || !company_id) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
