import React from 'react';
import AuthForm from '../../widgets/AuthForm/AuthForm';
import style from './AuthPage.module.scss';

const LoginPage = () => {
  return (
    <div className={style.AuthPage}>
      <AuthForm />
    </div>
  );
};

export default LoginPage;
