import StoreCard from '../../entities/StoreCard/StoreCard';
import Button from '../../shared/Button/Button';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import style from './StoreCardsPage.module.scss';

const StoreCardsPage = () => {
  const storeCard: any = undefined;

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
          {storeCard.map((card: any) => (
            <StoreCard key={card} {...card} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreCardsPage;
