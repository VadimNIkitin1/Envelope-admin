import { Link, useParams } from 'react-router-dom';

import { PATHNAME } from '@/app/constants';
import { useAppSelector } from '@/types/hooks';

import clsx from 'clsx';
import style from './Footer.module.scss';
import { getAllActiveProperties } from '@/store/activeSlice/selectors';

const Footer = () => {
  const { store_id } = useParams();
  const { theme } = useAppSelector((state) => getAllActiveProperties(state));

  return (
    <div className={clsx(style.footer, theme && style.light)}>
      <p className={clsx(style.text, theme && style.light)}>
        Разработано командой
        <Link className={style.link} to={PATHNAME.ABOUT}>
          Rékka-group
        </Link>
      </p>
      {store_id && (
        <p className={clsx(style.subscription, theme && style.light)}>Оплачено до 01.01.30г.</p>
      )}
    </div>
  );
};

export default Footer;
