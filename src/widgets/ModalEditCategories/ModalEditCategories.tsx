import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '../../types/hooks';

import style from './ModalEditCategories.module.scss';
import Button from '../../shared/Button/Button';

import { triggerRender } from '../../store/activeSlice';
import { toggleModalEditCategories } from '../../store/modalsSlice';
import { editCategory } from '../../store/categorySlice';
import { IRequestCategory } from '../ModalCategories/types';
import { clsx } from 'clsx';

const ModalEditCategories = () => {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.categories.category);
  const theme = useAppSelector((state) => state.active.theme);
  const { name, id } = category;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestCategory>({ mode: 'onBlur', defaultValues: { name: name } });

  const onSubmit: SubmitHandler<IRequestCategory> = (data: IRequestCategory) => {
    const requestData = {
      id,
      name: data.name,
      // availability: data.availability,
    };
    dispatch(editCategory(requestData));
    dispatch(triggerRender());
    dispatch(toggleModalEditCategories(false));
  };

  return (
    <div className={style.wrapper} onClick={() => dispatch(toggleModalEditCategories(false))}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <h1 className={style.modalTitle}>Редактирование</h1>
        <form className={style.modalForm} onSubmit={handleSubmit(onSubmit)}>
          <label className={style.modalLabel}>
            <p>Наименование</p>
            <input
              type="text"
              className={style.modalInput}
              {...register('name', {
                maxLength: { value: 20, message: 'Не более 20 символов' },
              })}
            />
            {errors.name && <p className={style.errorMsg}>{errors.name.message}</p>}
          </label>
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
          <div style={{ display: 'flex', columnGap: '20px' }}>
            <Button view="add" type={'submit'}>
              Изменить
            </Button>
            <Button view="delete" onClick={() => dispatch(toggleModalEditCategories(false))}>
              Закрыть
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditCategories;
