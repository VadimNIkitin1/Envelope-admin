import StoreCard from '../../entities/StoreCard/StoreCard';
import Button from '../../shared/Button/Button';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import style from './StoreCardsPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { getStores } from '../../store/storeSlice';
import { useEffect } from 'react';
import { toggleModalStores } from '../../store/modalsSlice';
import ModalStores from '../../widgets/ModalStores/ModalStores';

const StoreCardsPage = () => {
  const dispatch = useAppDispatch();
  const { stores } = useAppSelector((state) => state.store);
  const render = useAppSelector((state) => state.active.render);
  const modalStores = useAppSelector((state) => state.modals.modalStores);

  useEffect(() => {
    setTimeout(() => {
      dispatch(getStores());
    }, 200);
  }, [render]);

  return (
    <div className={style.page}>
      <Button view="add" onClick={() => dispatch(toggleModalStores(true))}>
        Создать магазин <BsFillPlusSquareFill />
      </Button>
      {stores === undefined || stores.length === 0 ? (
        <div className={style.messageAddButton}>
          <p className={style.message}>Нет созданных магазинов</p>
        </div>
      ) : (
        <div className={style.cardList}>
          {stores.map((card: any) => (
            <StoreCard key={card} {...card} />
          ))}
        </div>
      )}
      {modalStores && <ModalStores />}
    </div>
  );
};

export default StoreCardsPage;
