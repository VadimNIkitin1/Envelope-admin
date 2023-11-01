import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '../../types/hooks';

import style from './ModalEditCategories.module.scss';
import Button from '../../shared/Button/Button';

import { triggerRender } from '../../store/activeSlice';
import { toggleModalEditCategories } from '../../store/modalsSlice';
import { editCategory } from '../../store/categorySlice';
import { IRequestCategory } from '../ModalCategories/types';

const ModalEditCategories = () => {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.categories.category);
  const { name_rus, id } = category;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestCategory>({ mode: 'onBlur', defaultValues: { name_rus: name_rus } });

  const onSubmit: SubmitHandler<IRequestCategory> = (data: IRequestCategory) => {
    const requestData = {
      name_rus: data.name_rus,
      id,
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
              {...register('name_rus', {
                maxLength: { value: 20, message: 'Не более 20 символов' },
              })}
            />
            {errors.name_rus && <p className={style.errorMsg}>{errors.name_rus.message}</p>}
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
