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

import { IRequestProduct } from './types';
import { Checkbox } from '../../shared/Checkbox/Checkbox';
import { InputText } from '../../shared/InputText/InputText';
import { useLocalStorage } from '../../features/hooks/useLocalStorage';

const ModalProducts = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.categories.categories);
  const units = useAppSelector((state) => state.products.units);
  const [store_id] = useLocalStorage('store_id', '');

  useEffect(() => {
    dispatch(getCategories(store_id));
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
      id: store_id,
      category_id: Number(data.category_id),
      name: data.name,
      description: data.description,
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
                  minLength: { value: 10, message: 'Не менее 10 символов' },
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
                    className={style.modalSelect}
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
              {/* <InputFile {...register("image")} /> */}
              <label className={style.containerCheckbox}>
                В наличии
                <Checkbox {...register('availability')} />
              </label>
              <label className={style.containerCheckbox}>
                Популярное
                <Checkbox {...register('popular')} />
              </label>
              <label className={style.containerCheckbox}>
                Доставка
                <Checkbox {...register('delivery')} />
              </label>
              <label className={style.containerCheckbox}>
                Самовывоз
                <Checkbox {...register('takeaway')} />
              </label>
              <label className={style.containerCheckbox}>
                Зал
                <Checkbox {...register('dinein')} />
              </label>
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
