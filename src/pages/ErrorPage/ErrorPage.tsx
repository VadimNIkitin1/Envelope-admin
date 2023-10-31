import errorImage from '../../assets/error.png';
import { useRouteError } from 'react-router-dom';
import style from './ErrorPage.module.scss';
import React from 'react';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className={style.container}>
      <h1>Oops!!! 😬</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className={style.status}>
        <span>{error.status}</span>
        <i>{error.statusText || error.message}</i>
      </p>
      <img src={errorImage} alt="" width={'400px'} />
    </div>
  );
};

export default ErrorPage;
