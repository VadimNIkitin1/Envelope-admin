import { useForm, SubmitHandler } from 'react-hook-form';

import { toggleModal, ModalType } from '../../store/modalsSlice';
import { triggerRender } from '../../store/activeSlice';

import InputFile from '../../shared/InputFile/InputFile';
import Button from '../../shared/Button/Button';

import { addProduct, clearImageProduct, editProduct, getUnits } from '../../store/productSlice';

import { useEffect } from 'react';
import { getCategories } from '../../store/categorySlice';

import { useAppDispatch, useAppSelector } from '../../types/hooks';

import style from './ModalProducts.module.scss';

import { IRequestProduct } from './types';
import { Checkbox } from '../../shared/Checkbox/Checkbox';
import { InputText } from '../../shared/InputText/InputText';
import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react';
import clsx from 'clsx';
import { useParams } from 'react-router';

const ModalProducts = ({ type, isOpen }) => {
  const dispatch = useAppDispatch();
  const { store_id } = useParams();

  const { categories } = useAppSelector((state) => state.categories);

  const { product, units } = useAppSelector((state) => state.products);
  const { image } = product;

  const { theme } = useAppSelector((state) => state.active);

  const {
    id,
    name,
    price,
    wt,
    fats,
    kilocalories,
    proteins,
    carbohydrates,
    category_id,
    description,
    unit_id,
  } = product;

  useEffect(() => {
    dispatch(getCategories(store_id));
    dispatch(getUnits());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestProduct>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<IRequestProduct> = (data: IRequestProduct) => {
    if (type === ModalType.PRODUCTS) {
      const requestData = {
        id: store_id,
        ...data,
        image,
      };

      dispatch(addProduct(requestData));
    }

    if (type === ModalType.EDIT_PRODUCTS) {
      const requestData = {
        id,
        ...data,
        image,
      };

      dispatch(editProduct(requestData));
    }

    dispatch(triggerRender());
    dispatch(toggleModal({ action: false, type }));
  };

  const handleClose = () => {
    dispatch(toggleModal({ action: false, type }));
    dispatch(clearImageProduct());
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent marginTop={30} borderRadius={16}>
        <ModalBody className={clsx(style.modal, theme && style.light)}>
          <h1 className={clsx(style.modalTitle, theme && style.light)}>Добавить продукт</h1>
          <form className={style.modalForm} onSubmit={handleSubmit(onSubmit)}>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                columnGap: '100px',
                marginBottom: '30px',
              }}
            >
              <label className={style.modalLabel}>
                <select
                  defaultValue={type === ModalType.EDIT_PRODUCTS ? category_id : undefined}
                  {...register('category_id', {
                    required: { value: true, message: 'Выберите категорию' },
                  })}
                  name="category_id"
                  className={clsx(style.modalSelect, theme && style.light)}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <p className={style.errorMsg}>{errors.category_id.message}</p>
                )}
              </label>
              <label className={style.modalLabel}>
                <InputText
                  defaultValue={type === ModalType.EDIT_PRODUCTS ? name : undefined}
                  error={errors.name}
                  view="text"
                  placeholder="Наименование"
                  {...register('name', {
                    required: { value: true, message: 'Поле обязательно для заполнения' },
                  })}
                />
              </label>
            </div>
            <div style={{ display: 'flex', columnGap: '20px', marginBottom: '30px' }}>
              <label className={style.modalLabel}>
                <p className={style.productTitle}>Описание</p>
                <textarea
                  defaultValue={type === ModalType.EDIT_PRODUCTS ? description : undefined}
                  placeholder="Описание"
                  className={clsx(style.modalDescription, theme && style.light)}
                  {...register('description', {
                    required: { value: true, message: 'Поле обязательно для заполнения' },
                    minLength: { value: 10, message: 'Не менее 10 символов' },
                  })}
                />
                <div className={style.descGroup}>
                  <InputText
                    defaultValue={type === ModalType.EDIT_PRODUCTS ? kilocalories : undefined}
                    error={errors.kilocalories}
                    placeholder="Ккал"
                    view="number"
                    className={style.modalInputSmall}
                    {...register('kilocalories', {
                      required: { value: true, message: 'Поле обязательно для заполнения' },
                    })}
                  />
                  <InputText
                    defaultValue={type === ModalType.EDIT_PRODUCTS ? proteins : undefined}
                    error={errors.proteins}
                    placeholder="Белки"
                    view="number"
                    className={style.modalInputSmall}
                    {...register('proteins', {
                      required: { value: true, message: 'Поле обязательно для заполнения' },
                    })}
                  />
                  <InputText
                    defaultValue={type === ModalType.EDIT_PRODUCTS ? fats : undefined}
                    error={errors.fats}
                    placeholder="Жиры"
                    view="number"
                    className={style.modalInputSmall}
                    {...register('fats', {
                      required: { value: true, message: 'Поле обязательно для заполнения' },
                    })}
                  />
                  <InputText
                    defaultValue={type === ModalType.EDIT_PRODUCTS ? carbohydrates : undefined}
                    error={errors.carbohydrates}
                    placeholder="Углеводы"
                    view="number"
                    className={style.modalInputSmall}
                    {...register('carbohydrates', {
                      required: { value: true, message: 'Поле обязательно для заполнения' },
                    })}
                  />
                </div>
                <label className={style.modalLabel}>
                  <p className={style.productTitle}>Цена</p>
                  <InputText
                    defaultValue={type === ModalType.EDIT_PRODUCTS ? price : undefined}
                    error={errors.price}
                    placeholder="Цена"
                    view="number"
                    className={style.modalInputSmall}
                    {...register('price', {
                      required: { value: true, message: 'Поле обязательно для заполнения' },
                    })}
                  />
                </label>
                <label className={style.modalLabel}>
                  <p className={style.productTitle}>Выход</p>
                  <div className={style.descGroup}>
                    <InputText
                      defaultValue={type === ModalType.EDIT_PRODUCTS ? wt : undefined}
                      error={errors.wt}
                      placeholder="Выход"
                      view="number"
                      className={style.modalInputSmall}
                      {...register('wt', {
                        required: { value: true, message: 'Поле обязательно для заполнения' },
                      })}
                    />
                    <select
                      defaultValue={type === ModalType.EDIT_PRODUCTS ? unit_id : undefined}
                      {...register('unit_id', {
                        required: { value: true, message: 'Выберите единицу изм.' },
                      })}
                      className={clsx(style.modalSelect, theme && style.light)}
                    >
                      {units.map((unit) => (
                        <option key={unit.id} value={unit.id}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                    {errors.unit_id && <p className={style.errorMsg}>{errors.unit_id.message}</p>}
                  </div>
                </label>
              </label>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: '10px',
                }}
              >
                <InputFile
                  type="product"
                  {...register('image')}
                  error={errors.image}
                  style={{ width: '250px', height: '245px', objectFit: 'cover' }}
                />
                {type === ModalType.PRODUCTS && (
                  <>
                    <label className={clsx(style.containerCheckbox, theme && style.light)}>
                      В наличии
                      <Checkbox {...register('availability')} />
                    </label>
                    <label className={clsx(style.containerCheckbox, theme && style.light)}>
                      Популярное
                      <Checkbox {...register('popular')} />
                    </label>
                    <label className={clsx(style.containerCheckbox, theme && style.light)}>
                      Доставка
                      <Checkbox {...register('delivery')} />
                    </label>
                    <label className={clsx(style.containerCheckbox, theme && style.light)}>
                      Самовывоз
                      <Checkbox {...register('takeaway')} />
                    </label>
                    <label className={clsx(style.containerCheckbox, theme && style.light)}>
                      Зал
                      <Checkbox {...register('dinein')} />
                    </label>
                  </>
                )}
              </div>
            </div>
            <div style={{ display: 'flex', columnGap: '20px' }}>
              <Button view="add" style={{ fontSize: '20px' }} type={'submit'}>
                {type === ModalType.PRODUCTS && 'Добавить'}
                {type === ModalType.EDIT_PRODUCTS && 'Редактировать'}
              </Button>
              <Button view="delete" style={{ fontSize: '20px' }} onClick={handleClose}>
                Закрыть
              </Button>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { ModalProducts };
