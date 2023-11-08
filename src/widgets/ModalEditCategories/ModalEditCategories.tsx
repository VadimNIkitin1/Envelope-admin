import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useAppSelector, useAppDispatch } from '../../types/hooks';

import style from './ModalEditCategories.module.scss';
import Button from '../../shared/Button/Button';

import { triggerRender } from '../../store/activeSlice';
import { toggleModalEditCategories } from '../../store/modalsSlice';
import { editCategory } from '../../store/categorySlice';
import { IRequestCategory } from '../ModalCategories/types';

import { InputText } from '../../shared/InputText/InputText';
// import { Checkbox } from '../../shared/Checkbox/Checkbox';

const ModalEditCategories = () => {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.categories.category);
  const { name, id } = category;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestCategory>({
    mode: 'onBlur',
    defaultValues: { name: name },
  });

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
            <InputText
              error={errors.name}
              placeholder="Ниаменование"
              view="text"
              {...register('name', {
                maxLength: { value: 20, message: 'Не более 20 символов' },
              })}
            />
          </label>
          {/* <label className={style.containerCheckbox}>
            В наличии
            <Checkbox {...register('availability')} />
          </label> */}
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
