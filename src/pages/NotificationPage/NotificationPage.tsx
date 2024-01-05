import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '@/types/hooks';

import { sendMessage, sendMessageMyself } from '@/store/mailSlice';
import { ModalType, toggleModal } from '@/store/modalsSlice';

import { ModalRecipient } from '@/widgets/Modals/ModalRecipient/ModalRecipient';
import InputFile from '@/shared/InputFile/InputFile';
import Button from '@/shared/Button/Button';
import { InputText } from '@/shared/InputText/InputText';

import { clsx } from 'clsx';
import style from './NotificationPage.module.scss';

export interface INotification {
  title?: string;
  mail_text?: string;
  photo_url?: string;
  users?: string[];
}

const NotificationPage = () => {
  const dispatch = useAppDispatch();
  const { theme, recipient } = useAppSelector((state) => state.active);
  const photo_url = useAppSelector((state) => state.mail.photo_url);
  const modalRecipient = useAppSelector((state) => state.modals.modalRecipient);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INotification>();

  const onSubmit: SubmitHandler<INotification> = (data: INotification) => {
    const requestData = {
      ...data,
      photo_url,
    };

    dispatch(sendMessage(requestData));
    reset();
  };

  const onSubmitMyself: SubmitHandler<INotification> = (data: INotification) => {
    const requestData = {
      ...data,
      photo_url,
    };

    console.log(recipient);
    dispatch(sendMessageMyself(requestData));
  };

  return (
    <div>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'flex', justifyContent: 'center', columnGap: '20px' }}>
          <label>
            <InputText
              style={{ width: '500px' }}
              placeholder={'Заголовок'}
              view={'text'}
              {...register('title')}
              error={errors.title}
            />
          </label>
          <Button
            view="add"
            style={{ fontSize: '20px' }}
            onClick={() => dispatch(toggleModal({ action: true, type: ModalType.RECIPIENT }))}
          >
            Выбрать получателей
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            columnGap: '30px',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <label>
              <textarea
                placeholder="Текст рассылки"
                className={clsx(style.textNotification, theme && style.light)}
                {...register('mail_text')}
              />
              {errors.mail_text && <p className={style.errorMsg}>{errors.mail_text.message}</p>}
            </label>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                type="button"
                view="add"
                style={{ fontSize: '20px', color: '#fff' }}
                onClick={handleSubmit(onSubmitMyself)}
              >
                Отправить себе
              </Button>
              <Button style={{ fontSize: '20px' }} view="add">
                Отправить рассылку
              </Button>
            </div>
          </div>
          <InputFile
            type="mail"
            error={errors.photo_url}
            {...register('photo_url')}
            style={{ width: '350px', height: '345px', objectFit: 'cover' }}
          />
          <div className={style.instructions_container}>
            <h2 className={style.instructions_title}>Форматирование текста</h2>
            <p>
              Для жирного текста обернуть звездочками *текст*
              <br />
              <br />
              Для наклонного текста обернуть нижними подчеркиваниями _текст_
              <br />
              <br />
              Для подчеркнутого текста обернуть двумя нижними подчеркиваниями __текст__
              <br />
              <br />
              Для спойлера обернуть в ||текст||
              <br />
              <br />
              Для текста-ссылки обернуть в [текст-ссылка] а саму ссылку в (скобки) соблюдая порядок,
              сначала текст потом ссылка
              <br />
              <br />
              Перед символами * _ {} [ ] ( ) # + - . ! обязательно добавить \
            </p>
          </div>
        </div>
        {/* <label className={style.imageInput}>
          <p className={style.labelImage}>Выберите получателей рассылки</p>
          <input type="button" className={style.imageNotification} {...register('users')} />
        </label> */}
      </form>
      {modalRecipient && <ModalRecipient isOpen={modalRecipient} type={ModalType.RECIPIENT} />}
    </div>
  );
};

export { NotificationPage };
