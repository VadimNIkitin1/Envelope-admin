import { Link } from 'react-router-dom';
import style from './Footer.module.scss';
import { PATHNAME } from '../../app/constants';
import { useAppSelector } from '../../types/hooks';
import clsx from 'clsx';
import { useEffect } from 'react';

const Footer = () => {
  const theme = useAppSelector((state) => state.active.theme);
  const render = useAppSelector((state) => state.active.render);
  let store_id = localStorage.getItem('store_id');

  useEffect(() => {
    store_id = localStorage.getItem('store_id');
  }, [render]);

  console.log(store_id);

  return (
    <div className={clsx(style.footer, theme && style.light)}>
      <p className={clsx(style.text, theme && style.light)}>
        Разработано командой
        <Link className={style.link} to={PATHNAME.ABOUT}>
          Envelope-App
        </Link>
      </p>
      {store_id && (
        <p className={clsx(style.subscription, theme && style.light)}>Оплачено до 01.01.30г.</p>
      )}
    </div>
  );
};

export default Footer;
