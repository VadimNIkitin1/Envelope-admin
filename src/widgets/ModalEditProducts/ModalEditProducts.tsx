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
import { useLocalStorage } from '../../features/hooks/useLocalStorage';
// import { clsx } from 'clsx';

const ModalEditProducts = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  // const theme = useAppSelector((state) => state.active.theme);
  const product = useAppSelector((state) => state.products.product);
  const units = useAppSelector((state) => state.products.units);
  const [store_id] = useLocalStorage('store_id', '');

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
    description,
  } = product;

  useEffect(() => {
    dispatch(getCategories(store_id));
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
      description,
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
                {...register('category_id', {
                  required: { value: true, message: 'Выберите категорию' },
                })}
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
                  required: { value: true, message: 'Поле обязательно для заполнения' },
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
                {...register('description', {
                  required: { value: true, message: 'Поле обязательно для заполнения' },
                })}
              />
              <div className={style.descGroup}>
                <InputText
                  error={errors.kilocalories}
                  placeholder="Ккал"
                  view="number"
                  className={style.modalInputSmall}
                  {...register('kilocalories', {
                    required: { value: true, message: 'Поле обязательно для заполнения' },
                  })}
                />
                <InputText
                  error={errors.proteins}
                  placeholder="Белки"
                  view="number"
                  className={style.modalInputSmall}
                  {...register('proteins', {
                    required: { value: true, message: 'Поле обязательно для заполнения' },
                  })}
                />
                <InputText
                  error={errors.fats}
                  placeholder="Жиры"
                  view="number"
                  className={style.modalInputSmall}
                  {...register('fats', {
                    required: { value: true, message: 'Поле обязательно для заполнения' },
                  })}
                />
                <InputText
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
                    error={errors.wt}
                    placeholder="Выход"
                    view="number"
                    className={style.modalInputSmall}
                    {...register('wt', {
                      required: { value: true, message: 'Поле обязательно для заполнения' },
                    })}
                  />
                  <select
                    {...register('unit_id', {
                      required: { value: true, message: 'Выберите единицу изм.' },
                    })}
                    name="unit"
                    className={style.modalSelect}
                  >
                    {units.map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>
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
