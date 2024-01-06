import { StoreCard } from '@/entities/StoreCard/StoreCard';

import { tariff } from '@/assets/db';

import style from './PricesPage.module.scss';

const PricesPage = () => {
  return (
    <div className={style.page}>
      {tariff.map((card) => (
        <StoreCard key={card.id} {...card} />
      ))}
    </div>
  );
};

export { PricesPage };
