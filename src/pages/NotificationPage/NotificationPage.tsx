import React from 'react';
import NotificationForm from '../../widgets/NotificationForm/NotificationForm';
import style from './NotificationPage.module.scss';

const NotificationPage = () => {
  return (
    <div className={style.NotificationPage}>
      <NotificationForm />
    </div>
  );
};

export default NotificationPage;
