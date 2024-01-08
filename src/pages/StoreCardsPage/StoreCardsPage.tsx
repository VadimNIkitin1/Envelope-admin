import { useEffect } from 'react';
import { BsFillPlusSquareFill } from 'react-icons/bs';

import { useAppDispatch, useAppSelector } from '@/types/hooks';

import { getStores } from '@/store/storeSlice';
import { ModalType, toggleModal } from '@/store/modalsSlice';

import { ModalStores } from '@/widgets/Modals/ModalStores';
import { ModalDelete } from '@/widgets/Modals/ModalDelete';
import { StoreCard } from '@/entities/StoreCard';

import { IStore } from '@/types/stores';
import { clsx } from 'clsx';
import style from './StoreCardsPage.module.scss';

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
          <button
            className={clsx(style.cardAddStore, theme && style.light)}
            onClick={() => dispatch(toggleModal({ action: true, type: ModalType.STORES }))}
          >
            <div className={style.cardAddStore_text}>
              <p>Создать магазин</p>
              <BsFillPlusSquareFill />
            </div>
          </button>
        </div>
      ) : (
        <div className={style.cardList}>
          <button
            className={clsx(style.cardAddStore, theme && style.light)}
            onClick={() => dispatch(toggleModal({ action: true, type: ModalType.STORES }))}
          >
            <div className={style.cardAddStore_text}>
              <p>Создать магазин</p>
              <BsFillPlusSquareFill />
            </div>
          </button>
          {stores.map((card: IStore) => (
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

export { StoreCardsPage };
