import { useRouteError } from 'react-router-dom';

import errorImage from '@/assets/error.png';

import style from './ErrorPage.module.scss';
import { ApiError } from '@/store';

const ErrorPage = () => {
  const error = useRouteError() as ApiError;

  return (
    <div id="error-page" className={style.container}>
      <h1>Oops!!! 😬</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className={style.status}>
        <span>{error.message}</span>
        <i>{error.message}</i>
      </p>
      <img src={errorImage} alt="" width={'400px'} />
    </div>
  );
};

export { ErrorPage };
