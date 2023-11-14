import { Link } from 'react-router-dom';
import style from './Footer.module.scss';
import { PATHNAME } from '../../app/constants';

const Footer = () => {
  return (
    <div className={style.footer}>
      <p className={style.text}>
        Разработано командой
        <Link className={style.link} to={PATHNAME.ABOUT}>
          Envelope-App
        </Link>
      </p>
      <p className={style.subscription}>Оплачено до 01.01.30г.</p>
    </div>
  );
};

export default Footer;
