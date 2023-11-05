import { useForm, SubmitHandler } from 'react-hook-form';

import { toggleModalProducts } from '../../store/modalsSlice';
import { triggerRender } from '../../store/activeSlice';

// import InputFile from '../../shared/InputFile/InputFile';
import Button from '../../shared/Button/Button';

import { addProduct, getUnits } from '../../store/productSlice';

import { useEffect } from 'react';
import { getCategories } from '../../store/categorySlice';

import { useAppDispatch, useAppSelector } from '../../types/hooks';

import style from './ModalProducts.module.scss';
import { clsx } from 'clsx';
import { IRequestProduct } from './types';

const ModalProducts = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  const units = useAppSelector((state) => state.products.units);
  const theme = useAppSelector((state) => state.active.theme);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getUnits());
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IRequestProduct>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<IRequestProduct> = (data: IRequestProduct) => {
    const requestData = {
      category_id: Number(data.category_id),
      name_rus: data.name_rus,
      description_rus: data.description_rus,
      price: Number(data.price),
      wt: Number(data.wt),
      kilocalories: Number(data.kilocalories),
      proteins: Number(data.proteins),
      fats: Number(data.fats),
      carbohydrates: Number(data.carbohydrates),
      unit_id: Number(data.unit_id),
      availability: data.availability,
      popular: data.popular,
      delivery: data.delivery,
      takeaway: data.takeaway,
      dinein: data.dinein,
    };

    dispatch(addProduct(requestData));
    dispatch(triggerRender());
    dispatch(toggleModalProducts(false));
    reset();
  };

  return (
    <div className={style.wrapper} onClick={() => dispatch(toggleModalProducts(false))}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <h1 className={style.modalTitle}>Добавить продукт</h1>
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
                    {cat.name}
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
                className={style.modalDescription}
                {...register('description_rus', { required: true })}
              />
              <div className={style.descGroup}>
                <input
                  placeholder="Ккал"
                  type="number"
                  className={style.modalInputSmall}
                  {...register('kilocalories', { required: true })}
                />
                <input
                  placeholder="Белки"
                  type="number"
                  className={style.modalInputSmall}
                  {...register('proteins', { required: true })}
                />
                <input
                  placeholder="Жиры"
                  type="number"
                  className={style.modalInputSmall}
                  {...register('fats', { required: true })}
                />
                <input
                  placeholder="Углеводы"
                  type="number"
                  className={style.modalInputSmall}
                  {...register('carbohydrates', { required: true })}
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
                  <select {...register('unit_id')} name="unit" className={style.modalSelect}>
                    {units.map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.wt && <p className={style.errorMsg}>{errors.wt.message}</p>}
              </label>
              {errors.description_rus && (
                <p className={style.errorMsg}>{errors.description_rus.message}</p>
              )}
            </label>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '10px',
              }}
            >
              {/* <InputFile {...register("image")} /> */}
              <label className={style.containerCheckbox}>
                В наличии
                <input type="checkbox" {...register('availability')} />
                <svg viewBox="0 0 64 64" height="18px" width="18px">
                  <path
                    d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                    pathLength="575.0541381835938"
                    className={clsx(style.path, theme && style.light)}
                  ></path>
                </svg>
              </label>
              <label className={style.containerCheckbox}>
                Популярное
                <input type="checkbox" {...register('popular')} />
                <svg viewBox="0 0 64 64" height="18px" width="18px">
                  <path
                    d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                    pathLength="575.0541381835938"
                    className={clsx(style.path, theme && style.light)}
                  ></path>
                </svg>
              </label>
              <label className={style.containerCheckbox}>
                Доставка
                <input type="checkbox" {...register('delivery')} />
                <svg viewBox="0 0 64 64" height="18px" width="18px">
                  <path
                    d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                    pathLength="575.0541381835938"
                    className={clsx(style.path, theme && style.light)}
                  ></path>
                </svg>
              </label>
              <label className={style.containerCheckbox}>
                Самовывоз
                <input type="checkbox" {...register('takeaway')} />
                <svg viewBox="0 0 64 64" height="18px" width="18px">
                  <path
                    d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                    pathLength="575.0541381835938"
                    className={clsx(style.path, theme && style.light)}
                  ></path>
                </svg>
              </label>
              <label className={style.containerCheckbox}>
                Зал
                <input type="checkbox" {...register('dinein')} />
                <svg viewBox="0 0 64 64" height="18px" width="18px">
                  <path
                    d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                    pathLength="575.0541381835938"
                    className={clsx(style.path, theme && style.light)}
                  ></path>
                </svg>
              </label>
              {/* <label className={style.labelCheckbox}>
                В наличии
                <Checkbox {...register("availability")} />
              </label> */}
            </div>
          </div>
          <div style={{ display: 'flex', columnGap: '20px' }}>
            <Button view="add" type={'submit'}>
              Добавить
            </Button>
            <Button view="delete" onClick={() => dispatch(toggleModalProducts(false))}>
              Закрыть
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalProducts;
