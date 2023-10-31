import StoreCard from '../../entities/StoreCard/StoreCard';
import Button from '../../shared/Button/Button';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import style from './StoreCardsPage.module.scss';
import React from 'react';

const StoreCardsPage = () => {
  const storeCard = undefined;

  return (
    <div className={style.page}>
      <Button view="add">
        Создать магазин <BsFillPlusSquareFill />
      </Button>
      {storeCard === undefined || storeCard.length === 0 ? (
        <div className={style.messageAddButton}>
          <p className={style.message}>Нет созданных магазинов</p>
        </div>
      ) : (
        <div className={style.cardList}>
          {storeCard.map((card) => (
            <StoreCard key={card} name={card} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreCardsPage;
