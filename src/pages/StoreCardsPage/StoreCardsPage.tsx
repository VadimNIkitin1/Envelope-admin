import StoreCard from '../../entities/StoreCard/StoreCard';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import style from './StoreCardsPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { getStores } from '../../store/storeSlice';
import { useEffect } from 'react';
import { ModalType, toggleModal } from '../../store/modalsSlice';

import { ModalStores } from '../../widgets/Modals/ModalStores/ModalStores';
import { clsx } from 'clsx';
import { ModalDelete } from '../../widgets/Modals/ModalDelete/ModalDelete';

const StoreCardsPage = () => {
  const dispatch = useAppDispatch();
  const { stores } = useAppSelector((state) => state.store);
  const { render, theme } = useAppSelector((state) => state.active);
  const { modalStores, modalEditStores, modalForDelete } = useAppSelector((state) => state.modals);

  useEffect(() => {
    dispatch(getStores());
  }, [render]);

  return (
    <div className={style.page}>
      {stores === undefined || stores.length === 0 ? (
        <div className={style.cardList}>
          <div
            className={clsx(style.cardAddStore, theme && style.light)}
            onClick={() => dispatch(toggleModal({ action: true, type: ModalType.STORES }))}
          >
            <div className={style.cardAddStore_text}>
              <p>Создать магазин</p>
              <BsFillPlusSquareFill />
            </div>
          </div>
        </div>
      ) : (
        <div className={style.cardList}>
          <div
            className={clsx(style.cardAddStore, theme && style.light)}
            onClick={() => dispatch(toggleModal({ action: true, type: ModalType.STORES }))}
          >
            <div className={style.cardAddStore_text}>
              <p>Создать магазин</p>
              <BsFillPlusSquareFill />
            </div>
          </div>
          {stores.map((card: any) => (
            <StoreCard key={card.id} {...card} />
          ))}
        </div>
      )}
      {modalStores && <ModalStores isOpen={modalStores} type={ModalType.STORES} />}
      {modalEditStores && <ModalStores isOpen={modalEditStores} type={ModalType.EDIT_STORES} />}
      {modalForDelete && <ModalDelete isOpen={modalForDelete} type={ModalType.DELETE} />}
    </div>
  );
};

export default StoreCardsPage;
