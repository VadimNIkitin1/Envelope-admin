import { ModalWindow } from '../../../entities/ModalWindow/ModalWindow';
import { useAppDispatch, useAppSelector } from '../../../types/hooks';
import { InputText } from '../../../shared/InputText/InputText';
import style from './ModalToken.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IRequestTokenBot } from './types';
import { toggleModal } from '../../../store/modalsSlice';
import { triggerRender } from '../../../store/activeSlice';
import { useParams } from 'react-router-dom';
import { editTokenBot } from '../../../store/storeSlice';

const ModalToken = ({ isOpen, type }) => {
  const dispatch = useAppDispatch();
  const { token_bot } = useAppSelector((state) => state.store.store.bot_tokens);
  const { store_id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRequestTokenBot>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<IRequestTokenBot> = (data: IRequestTokenBot) => {
    const requestData = {
      id: store_id,
      ...data,
    };

    dispatch(editTokenBot(requestData));
    dispatch(triggerRender());
    dispatch(toggleModal({ action: false, type }));
  };

  return (
    <ModalWindow
      isOpen={isOpen}
      onClose={() => dispatch(toggleModal({ action: false, type }))}
      title={'Редактировать'}
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className={style.modalLabel}>
        <InputText
          defaultValue={token_bot}
          error={errors.token_bot}
          view="number"
          placeholder="Токен бота"
          style={{ width: '450px' }}
          {...register('token_bot', {
            required: true,
          })}
        />
      </label>
    </ModalWindow>
  );
};

export { ModalToken };
