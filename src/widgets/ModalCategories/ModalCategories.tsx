import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { IRequestCategory } from './types';
import { InputText } from '../../shared/InputText/InputText';

import style from './ModalCategories.module.scss';
import Button from '../../shared/Button/Button';
import { useAppDispatch, useAppSelector } from '../../types/hooks';
import { triggerRender } from '../../store/activeSlice';
import { ModalType, toggleModal } from '../../store/modalsSlice';
import { addCategory, editCategory } from '../../store/categorySlice';
import { Checkbox } from '../../shared/Checkbox/Checkbox';
import { useLocalStorage } from '../../features/hooks/useLocalStorage';

const ModalCategories = ({ type }) => {
  const dispatch = useAppDispatch();
  const [store_id] = useLocalStorage('store_id', '');
  const category = useAppSelector((state) => state.categories.category);
  const { name, id } = category;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestCategory>({ mode: 'onBlur' });

  const handleClick = (type) => {
    if (type === ModalType.CATEGORIES) {
      dispatch(toggleModal({ action: false, type }));
    }

    if (type === ModalType.EDIT_CATEGORIES) {
      dispatch(toggleModal({ action: false, type }));
    }
  };

  const onSubmit: SubmitHandler<IRequestCategory> = (data: IRequestCategory) => {
    if (type === ModalType.CATEGORIES) {
      const requestData = {
        id: store_id,
        ...data,
      };
      dispatch(addCategory(requestData));
    }

    if (type === ModalType.EDIT_CATEGORIES) {
      const requestData = {
        id,
        ...data,
      };
      dispatch(editCategory(requestData));
    }

    dispatch(triggerRender());
    dispatch(toggleModal({ action: false, type }));
  };

  return (
    <div className={style.wrapper} onClick={() => handleClick(type)}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <h1 className={style.modalTitle}>Добавить категорию</h1>
        <form className={style.modalForm} onSubmit={handleSubmit(onSubmit)}>
          {type === ModalType.CATEGORIES && (
            <>
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
            </>
          )}
          {type === ModalType.EDIT_CATEGORIES && (
            <label className={style.modalLabel}>
              <InputText
                defaultValue={name}
                error={errors.name}
                view="text"
                placeholder="Наименование"
                {...register('name', {
                  required: true,
                  maxLength: { value: 20, message: 'Не более 20 символов' },
                })}
              />
            </label>
          )}
          <div style={{ display: 'flex', columnGap: '20px' }}>
            <Button view="add" type="submit">
              Добавить
            </Button>
            <Button view="delete" onClick={() => handleClick(type)}>
              Закрыть
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { ModalCategories };
