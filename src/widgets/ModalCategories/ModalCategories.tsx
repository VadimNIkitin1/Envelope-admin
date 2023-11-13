import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { IRequestCategory } from './types';
import { InputText } from '../../shared/InputText/InputText';

import style from './ModalCategories.module.scss';
import Button from '../../shared/Button/Button';
import { useAppDispatch } from '../../types/hooks';
import { triggerRender } from '../../store/activeSlice';
import { ModalType, toggleModal } from '../../store/modalsSlice';
import { addCategory } from '../../store/categorySlice';
import { Checkbox } from '../../shared/Checkbox/Checkbox';
import { useLocalStorage } from '../../features/hooks/useLocalStorage';

const ModalCategories = () => {
  const dispatch = useAppDispatch();
  const [store_id] = useLocalStorage('store_id', '');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestCategory>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<IRequestCategory> = (data: IRequestCategory) => {
    const requestData = {
      id: store_id,
      name: data.name,
      availability: data.availability,
    };
    dispatch(addCategory(requestData));
    dispatch(triggerRender());
    dispatch(toggleModal({ action: false, type: ModalType.CATEGORIES }));
  };

  return (
    <div
      className={style.wrapper}
      onClick={() => dispatch(toggleModal({ action: false, type: ModalType.CATEGORIES }))}
    >
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
            <Button
              view="delete"
              onClick={() => dispatch(toggleModal({ action: false, type: ModalType.CATEGORIES }))}
            >
              Закрыть
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { ModalCategories };
