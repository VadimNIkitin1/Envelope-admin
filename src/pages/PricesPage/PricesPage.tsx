import StoreCard from '../../entities/StoreCard/StoreCard';
import { prices } from '../../assets/db';
import style from './PricesPage.module.scss';
import React from 'react';

const PricesPage = () => {
  return (
    <div className={style.PricesPage}>
      {prices.map((card) => (
        <StoreCard key={card} name={card} />
      ))}
    </div>
  );
};

export default PricesPage;
