import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { INotification } from './types';
import style from './NotificationForm.module.scss';
import { clsx } from 'clsx';
// import InputFile from '../../shared/InputFile/InputFile';
import Button from '../../shared/Button/Button';

import { useAppSelector } from '../../types/hooks';

const NotificationForm = () => {
  const theme = useAppSelector((state) => state.active.theme);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<INotification>();

  const onSubmit: SubmitHandler<INotification> = (data: INotification) => {
    console.log(data);
    reset();
  };

  const onSubmitMyself: SubmitHandler<INotification> = (data: INotification) => {
    console.log(data);
  };

  return (
    <div>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <label>
          <p className={style.label}>Заголовок рассылки</p>
          <input
            className={clsx(style.titleNotification, theme && style.light)}
            {...register('title')}
          />
          {errors.title && <p className={style.errorMsg}>{errors.title.message}</p>}
        </label>
        <div style={{ display: 'flex', columnGap: '30px' }}>
          <label>
            <p className={style.label}>Текст рассылки</p>
            <textarea
              className={clsx(style.textNotification, theme && style.light)}
              {...register('text')}
            />
            {errors.text && <p className={style.errorMsg}>{errors.text.message}</p>}
          </label>
          {/* <InputFile {...register('file')} /> */}
        </div>
        <label className={style.imageInput}>
          <p className={style.labelImage}>Выберите получателей рассылки</p>
          <input type="button" className={style.imageNotification} {...register('users')} />
        </label>
        <Button type="button" view="edit" onClick={handleSubmit(onSubmitMyself)}>
          Отправить себе
        </Button>
        <Button view="add">Отправить рассылку</Button>
      </form>
    </div>
  );
};

export default NotificationForm;
