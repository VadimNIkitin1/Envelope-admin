import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { IRequestCategory } from './types';

import style from './ModalCategories.module.scss';
import Button from '../../shared/Button/Button';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { triggerRender } from '../../store/activeSlice';
import { toggleModalCategories } from '../../store/modalsSlice';
import { addCategory } from '../../store/categorySlice';
import { clsx } from 'clsx';

const ModalCategories = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.active.theme);
  const user_id = localStorage.getItem('user_id');
  console.log(user_id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestCategory>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<IRequestCategory> = (data: IRequestCategory) => {
    const requestData = {
      name: data.name,
      availability: data.availability,
      created_by: Number(localStorage.getItem('user_id')),
    };
    dispatch(addCategory(requestData));
    dispatch(triggerRender());
    dispatch(toggleModalCategories(false));
  };

  return (
    <div className={style.wrapper} onClick={() => dispatch(toggleModalCategories(false))}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <h1 className={style.modalTitle}>Добавить категорию</h1>
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
            <Button view="add" type="submit">
              Добавить
            </Button>
            <Button view="delete" onClick={() => dispatch(toggleModalCategories(false))}>
              Закрыть
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCategories;
