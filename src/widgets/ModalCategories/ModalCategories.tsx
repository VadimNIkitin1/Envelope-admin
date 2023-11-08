import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { IRequestCategory } from './types';
import { InputText } from '../../shared/InputText/InputText';

import style from './ModalCategories.module.scss';
import Button from '../../shared/Button/Button';
import { useAppDispatch } from '../../types/hooks';
import { triggerRender } from '../../store/activeSlice';
import { toggleModalCategories } from '../../store/modalsSlice';
import { addCategory } from '../../store/categorySlice';
import { Checkbox } from '../../shared/Checkbox/Checkbox';

const ModalCategories = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestCategory>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<IRequestCategory> = (data: IRequestCategory) => {
    const requestData = {
      name: data.name,
      availability: data.availability,
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
            <InputText
              error={errors.name}
              view="text"
              placeholder="Наименование"
              {...register('name', {
                required: true,
                maxLength: { value: 20, message: 'Не более 20 символов' },
              })}
            />
          </label>
          <label className={style.containerCheckbox}>
            В наличии
            <Checkbox {...register('availability')} />
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
