import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { IAuthRequestRegistration } from './types';
import { useNavigate, Link } from 'react-router-dom';
import { GiEnvelope } from 'react-icons/gi';

import { useAppSelector, useAppDispatch } from '../../types/hooks';

import style from './AuthForm.module.scss';
import { authorization } from '../../store/authSlice';
import { triggerRender } from '../../store/activeSlice';

const AuthForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const responseData = localStorage.getItem('data') || '';
  const render = useAppSelector((state) => state.active.render);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<IAuthRequestRegistration>({
    mode: 'onBlur',
  });

  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  const PASSWORD_REGEXP = /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?()]).*/;

  const onSubmit: SubmitHandler<IAuthRequestRegistration> = (data: IAuthRequestRegistration) => {
    const requestData = {
      username: data.username,
      hashed_password: data.hashed_password,
    };

    reset();
    dispatch(authorization(requestData));
    setTimeout(() => {
      dispatch(triggerRender());
    }, 1000);
  };

  useEffect(() => {
    if (responseData) {
      const parseData = JSON.parse(responseData);
      navigate(`/${parseData.data.user_id}/`, { replace: true });
    }
  }, [render]);

  return (
    <div className={style.AuthForm}>
      <h1 className={style.logoText}>
        ENVELOPE <GiEnvelope className={style.logo} />
      </h1>
      <h2 className={style.title}>Регистрация</h2>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={style.label}>
          <p>Логин</p>
          <input
            type="email"
            className={style.input}
            {...register('username', {
              required: 'Это поле обязательно для заполнения!',
              pattern: {
                value: EMAIL_REGEXP,
                message: 'Некоректный email!',
              },
            })}
          />
          {errors.username && <p className={style.errorMsg}>{errors.username.message}</p>}
        </label>
        <label className={style.label}>
          <p>Пароль</p>
          <input
            className={style.input}
            type="password"
            {...register('hashed_password', {
              required: 'Это поле обязательно для заполнения!',
              minLength: {
                value: 8,
                message: 'Пароль должен содержать минимум 8 символов!',
              },
              maxLength: {
                value: 40,
                message: 'Пароль должен содержать не более 40 символов!',
              },
              pattern: {
                value: PASSWORD_REGEXP,
                message:
                  'Должен содержать по крайней мере одно число, одну заглавную и строчную буквы, не менее 8 и более символов, а также люой из символов !@#$%^&*?',
              },
            })}
          />
          {errors.hashed_password && (
            <p className={style.errorMsg}>{errors.hashed_password.message}</p>
          )}
        </label>
        <label className={style.label}>
          <p>Повторите пароль</p>
          <input
            className={style.input}
            type="password"
            {...register('repeatPassword', {
              required: 'Это поле обязательно для заполнения!',
              validate: (value, allValues) => {
                const { hashed_password } = allValues;
                return hashed_password === value;
              },
            })}
          />
          {getValues('repeatPassword') !== getValues('hashed_password') && (
            <p className={style.errorMsg}>Пароль не совпадает!</p>
          )}
        </label>
        <button className={style.submit}>
          <input type="submit" value="Зарегестрироваться" disabled={!isValid} />
        </button>
      </form>
      <Link className={style.link} to={'/login'}>
        У вас уже есть аккаунт?
      </Link>
    </div>
  );
};

export default AuthForm;
