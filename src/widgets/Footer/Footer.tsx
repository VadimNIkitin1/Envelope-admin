import { Link } from 'react-router-dom';
import style from './Footer.module.scss';
import { PATHNAME } from '../../app/constants';
import { useAppSelector } from '../../types/hooks';
import clsx from 'clsx';

const Footer = () => {
  const theme = useAppSelector((state) => state.active.theme);

  return (
    <div className={clsx(style.footer, theme && style.light)}>
      <p className={clsx(style.text, theme && style.light)}>
        Разработано командой
        <Link className={style.link} to={PATHNAME.ABOUT}>
          Envelope-App
        </Link>
      </p>
      <p className={clsx(style.subscription, theme && style.light)}>Оплачено до 01.01.30г.</p>
    </div>
  );
};

export default Footer;
