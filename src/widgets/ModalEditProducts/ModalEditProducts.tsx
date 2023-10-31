import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../types/hooks';

import { toggleModalEditProducts } from '../../store/modalsSlice';
import { triggerRender } from '../../store/activeSlice';
import { getCategories } from '../../store/categorySlice';
import { editProduct } from '../../store/productSlice';

import InputFile from '../../shared/InputFile/InputFile';
import Button from '../../shared/Button/Button';
import Checkbox from '../../shared/Checkbox/Checkbox';

import style from './ModalEditProducts.module.scss';
import clsx from 'clsx';

const ModalEditProducts = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  const theme = useAppSelector((state) => state.active.theme);
  const product = useAppSelector((state) => state.products.product);
  const { name_rus, price, id, delivery, availability, dinein, popular, takeaway } = product;

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name_rus: name_rus,
      price: price,
      popular: popular,
      availability: availability,
      dinein: dinein,
      delivery: delivery,
      takeaway: takeaway,
    },
  });

  const onSubmit = (data) => {
    const requestData = {
      id,
      name_rus: data.name_rus,
      category_id: Number(data.category_id),
      description_rus: data.description_rus,
      price: Number(data.price),
      availability: data.availability,
      popular: data.popular,
      delivery: data.delivery,
      takeaway: data.takeaway,
      dinein: data.dinein,
    };

    dispatch(editProduct(requestData));
    dispatch(toggleModalEditProducts(false));
    dispatch(triggerRender());
  };

  return (
    <div className={style.wrapper} onClick={() => dispatch(toggleModalEditProducts(false))}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <h1 className={style.modalTitle}>Редактирование</h1>
        <form className={style.modalForm} onSubmit={handleSubmit(onSubmit)}>
          <div
            style={{
              display: 'flex',
              columnGap: '100px',
              marginBottom: '30px',
            }}
          >
            <label className={style.modalLabel}>
              <p className={style.productTitle}>Категория</p>
              <select
                {...register('category_id', { required: true })}
                name="category_id"
                className={style.modalSelect}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name_rus}
                  </option>
                ))}
              </select>
              {errors.category_id && <p className={style.errorMsg}>{errors.category_id.message}</p>}
            </label>
            <label className={style.modalLabel}>
              <p className={style.productTitle}>Наименование</p>
              <input
                type="text"
                className={style.modalInput}
                placeholder="Наименование"
                {...register('name_rus', {
                  maxLength: { value: 20, message: 'Не более 20 символов' },
                })}
              />
              {errors.name_rus && <p className={style.errorMsg}>{errors.name_rus.message}</p>}
            </label>
          </div>
          <div style={{ display: 'flex', columnGap: '20px', marginBottom: '30px' }}>
            <label className={style.modalLabel}>
              <p className={style.productTitle}>Описание</p>
              <textarea
                placeholder="Описание"
                type="text"
                className={style.modalDescription}
                {...register('description_rus', { required: true })}
              />
              <div className={style.descGroup}>
                <input
                  placeholder="Ккал"
                  type="number"
                  className={style.modalInputSmall}
                  {...register('calories')}
                />
                <input
                  placeholder="Белки"
                  type="number"
                  className={style.modalInputSmall}
                  {...register('protein')}
                />
                <input
                  placeholder="Жиры"
                  type="number"
                  className={style.modalInputSmall}
                  {...register('fat')}
                />
                <input
                  placeholder="Углеводы"
                  type="number"
                  className={style.modalInputSmall}
                  {...register('carbohydrates')}
                />
              </div>
              <label className={style.modalLabel}>
                <p className={style.productTitle}>Цена</p>
                <input
                  placeholder="Цена"
                  type="number"
                  className={style.modalInputSmall}
                  {...register('price', { required: true })}
                />
                {errors.price && <p className={style.errorMsg}>{errors.price.message}</p>}
              </label>
              <label className={style.modalLabel}>
                <p className={style.productTitle}>Выход</p>
                <div className={style.descGroup}>
                  <input
                    placeholder="Выход"
                    type="number"
                    className={style.modalInputSmall}
                    {...register('wt', { required: true })}
                  />
                  <select
                    {...register('unit', { required: true })}
                    name="unit"
                    className={style.modalSelect}
                  >
                    <option value="1">Шт.</option>
                    <option value="2">Порц.</option>
                  </select>
                </div>
                {errors.weight && <p className={style.errorMsg}>{errors.weight.message}</p>}
              </label>
              {errors.description && <p className={style.errorMsg}>{errors.description.message}</p>}
            </label>

            {/* <InputFile {...register("image")} /> */}
          </div>
          <div style={{ display: 'flex', columnGap: '20px' }}>
            <Button view="add" type={'submit'}>
              Изменить
            </Button>
            <Button view="delete" onClick={() => dispatch(toggleModalEditProducts(false))}>
              Закрыть
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditProducts;
