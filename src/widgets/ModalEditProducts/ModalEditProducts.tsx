import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../types/hooks';

import { toggleModalEditProducts } from '../../store/modalsSlice';
import { triggerRender } from '../../store/activeSlice';
import { getCategories } from '../../store/categorySlice';
import { editProduct } from '../../store/productSlice';

// import InputFile from '../../shared/InputFile/InputFile';
import Button from '../../shared/Button/Button';
// import Checkbox from '../../shared/Checkbox/Checkbox';

import style from './ModalEditProducts.module.scss';
import { IRequestProduct } from '../ModalProducts/types';
import { InputText } from '../../shared/InputText/InputText';
// import { clsx } from 'clsx';

const ModalEditProducts = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  // const theme = useAppSelector((state) => state.active.theme);
  const product = useAppSelector((state) => state.products.product);
  const {
    name,
    price,
    id,
    delivery,
    availability,
    dinein,
    popular,
    takeaway,
    wt,
    fats,
    kilocalories,
    proteins,
    carbohydrates,
    category_id,
  } = product;

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestProduct>({
    mode: 'onBlur',
    defaultValues: {
      name,
      price,
      category_id,
      wt,
      fats,
      kilocalories,
      proteins,
      carbohydrates,
      popular,
      availability,
      dinein,
      delivery,
      takeaway,
    },
  });

  const onSubmit: SubmitHandler<IRequestProduct> = (data: IRequestProduct) => {
    const requestData = {
      id,
      name_rus: data.name,
      category_id: Number(data.category_id),
      description: data.description,
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
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category_id && <p className={style.errorMsg}>{errors.category_id.message}</p>}
            </label>
            <label className={style.modalLabel}>
              <p className={style.productTitle}>Наименование</p>
              <InputText
                error={errors.name}
                view="text"
                placeholder="Наименование"
                {...register('name', {
                  maxLength: { value: 20, message: 'Не более 20 символов' },
                })}
              />
            </label>
          </div>
          <div style={{ display: 'flex', columnGap: '20px', marginBottom: '30px' }}>
            <label className={style.modalLabel}>
              <p className={style.productTitle}>Описание</p>
              <textarea
                placeholder="Описание"
                className={style.modalDescription}
                {...register('description', { required: true })}
              />
              <div className={style.descGroup}>
                <InputText
                  error={errors.kilocalories}
                  placeholder="Ккал"
                  view="number"
                  className={style.modalInputSmall}
                  {...register('kilocalories')}
                />
                <InputText
                  error={errors.proteins}
                  placeholder="Белки"
                  view="number"
                  className={style.modalInputSmall}
                  {...register('proteins')}
                />
                <InputText
                  error={errors.fats}
                  placeholder="Жиры"
                  view="number"
                  className={style.modalInputSmall}
                  {...register('fats')}
                />
                <InputText
                  error={errors.carbohydrates}
                  placeholder="Углеводы"
                  view="number"
                  className={style.modalInputSmall}
                  {...register('carbohydrates')}
                />
              </div>
              <label className={style.modalLabel}>
                <p className={style.productTitle}>Цена</p>
                <InputText
                  error={errors.price}
                  placeholder="Цена"
                  view="number"
                  className={style.modalInputSmall}
                  {...register('price', { required: true })}
                />
                {errors.price && <p className={style.errorMsg}>{errors.price.message}</p>}
              </label>
              <label className={style.modalLabel}>
                <p className={style.productTitle}>Выход</p>
                <div className={style.descGroup}>
                  <InputText
                    error={errors.wt}
                    placeholder="Выход"
                    view="number"
                    className={style.modalInputSmall}
                    {...register('wt', { required: true })}
                  />
                  <select
                    {...register('unit_id', { required: true })}
                    name="unit"
                    className={style.modalSelect}
                  >
                    <option value="1">Шт.</option>
                    <option value="2">Порц.</option>
                  </select>
                </div>
                {errors.wt && <p className={style.errorMsg}>{errors.wt.message}</p>}
              </label>
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
