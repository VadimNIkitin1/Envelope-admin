import { FC, ReactElement } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { toggleAuth } from '../../store/authSlice';

interface Props {
  children: ReactElement;
}

const RequireAuth: FC<Props> = ({ children }) => {
  const token = localStorage.getItem('token');
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
