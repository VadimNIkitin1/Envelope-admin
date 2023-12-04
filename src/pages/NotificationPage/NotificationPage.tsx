import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { clsx } from 'clsx';
import InputFile from '../../shared/InputFile/InputFile';
import Button from '../../shared/Button/Button';

import { useAppDispatch, useAppSelector } from '../../types/hooks';
import style from './NotificationPage.module.scss';
import { InputText } from '../../shared/InputText/InputText';
import { sendMessage } from '../../store/storeSlice';

export interface INotification {
  title?: string;
  mail_text?: string;
  file?: string;
  users?: string[];
}

const NotificationPage = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.active.theme);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INotification>();

  const onSubmit: SubmitHandler<INotification> = (data: INotification) => {
    dispatch(sendMessage({ mail_text: data.mail_text }));
    reset();
  };

  const onSubmitMyself: SubmitHandler<INotification> = (data: INotification) => {
    console.log(data);
  };

  return (
    <div>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <label>
            <InputText
              style={{ width: '500px' }}
              placeholder={'Заголовок'}
              view={'text'}
              {...register('title')}
              error={errors.title}
            />
          </label>
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
            error={errors.file}
            {...register('file')}
            style={{ width: '350px', height: '350px' }}
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
    </div>
  );
};

export { NotificationPage };
