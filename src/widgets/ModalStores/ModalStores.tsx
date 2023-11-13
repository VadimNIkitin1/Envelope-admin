import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../types/hooks';
import { IRequestStores } from './types';
import { InputText } from '../../shared/InputText/InputText';
import Button from '../../shared/Button/Button';
import style from './ModalStores.module.scss';
import { ModalType, toggleModal } from '../../store/modalsSlice';
import { addStore } from '../../store/storeSlice';
import { triggerRender } from '../../store/activeSlice';

const ModalStores = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestStores>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<IRequestStores> = (data: IRequestStores) => {
    dispatch(addStore(data));
    dispatch(triggerRender());
    dispatch(toggleModal({ action: false, type: ModalType.STORES }));
  };

  return (
    <div
      className={style.wrapper}
      onClick={() => dispatch(toggleModal({ action: false, type: ModalType.STORES }))}
    >
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <h1 className={style.modalTitle}>Добавить магазин</h1>
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
          <label className={style.modalLabel}>
            <InputText
              error={errors.token_bot}
              view="text"
              placeholder="Токен Бота"
              {...register('token_bot', {
                required: true,
              })}
            />
          </label>
          <div style={{ display: 'flex', columnGap: '20px' }}>
            <Button view="add" type="submit">
              Добавить
            </Button>
            <Button
              view="delete"
              onClick={() => dispatch(toggleModal({ action: false, type: ModalType.STORES }))}
            >
              Закрыть
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalStores;
