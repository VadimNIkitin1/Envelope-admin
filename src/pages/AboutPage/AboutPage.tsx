import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../shared/Button/Button';

import rykhlov from '../../assets/rykhlov.jpeg';
import nikitin from '../../assets/nikitin.jpeg';
import swarovskyi from '../../assets/swarovskyi.jpeg';

import style from './AboutPage.module.scss';

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <div className={style.page}>
      <div className={style.cards}>
        <div className={style.cardContainer}>
          <img src={rykhlov} alt="" className={style.image} />
          <p>Рыхлов Никита</p>
        </div>
        <div className={style.cardContainer}>
          <img src={nikitin} alt="" className={style.image} />
          <p>Никитин Вадим</p>
        </div>
        <div className={style.cardContainer}>
          <img src={swarovskyi} alt="" className={style.image} />
          <p>Сваровский Дима</p>
        </div>
      </div>
      <Button view="edit" onClick={() => navigate(-1)}>
        Назад
      </Button>
    </div>
  );
};

export default AboutPage;
