import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

import { Link, useNavigate } from 'react-router-dom';
import { GiEnvelope } from 'react-icons/gi';

import { logIn } from '../../store/authSlice';

import { useAppDispatch, useAppSelector } from '../../types/hooks';

import style from './LoginForm.module.scss';
import type { IAuthRequestLogIn } from './types';
import { triggerRender } from '../../store/activeSlice';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const responseData = localStorage.getItem('data') || '';
  const render = useAppSelector((state) => state.active.render);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IAuthRequestLogIn>({
    mode: 'onBlur',
  });

  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  const PASSWORD_REGEXP = /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?()]).*/;

  const onSubmit: SubmitHandler<IAuthRequestLogIn> = (data: IAuthRequestLogIn) => {
    const requestData = {
      username: data.username,
      password: data.password,
    };

    reset();
    dispatch(logIn(requestData));
    setTimeout(() => {
      dispatch(triggerRender());
    }, 1000);
  };

  useEffect(() => {
    if (responseData) {
      const parseData = JSON.parse(responseData);
      navigate(`/${parseData.data.user_id}/stores`, { replace: true });
    }
  }, [render]);

  return (
    <div className={style.LoginForm}>
      <h1 className={style.logoText}>
        ENVELOPE <GiEnvelope className={style.logo} />
      </h1>
      <h2 className={style.title}>Авторизация</h2>
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
            {...register('password', {
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
          {errors.password && <p className={style.errorMsg}>{errors.password.message}</p>}
        </label>
        <button className={style.submit}>
          <input type="submit" value="Войти" disabled={!isValid} />
        </button>
      </form>
      <Link className={style.link} to={'/auth'}>
        У вас нет аккаунта?
      </Link>
    </div>
  );
};

export default LoginForm;
