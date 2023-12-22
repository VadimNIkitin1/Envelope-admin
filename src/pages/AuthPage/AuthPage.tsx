import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { IAuthRequestRegistration } from './AuthPage.types';
import { useNavigate, Link } from 'react-router-dom';
import { GiEnvelope } from 'react-icons/gi';

import { useAppSelector, useAppDispatch } from '../../types/hooks';

import { AuthType, logIn, registration } from '../../store/authSlice';
import { triggerRender } from '../../store/activeSlice';
import { InputText } from '../../shared/InputText/InputText';
import style from './AuthPage.module.scss';

const AuthPage = ({ type }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const responseData = localStorage.getItem('data') || '';
  const render = useAppSelector((state) => state.active.render);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<IAuthRequestRegistration>({
    mode: 'onBlur',
  });

  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  const PASSWORD_REGEXP = /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?()]).*/;

  const onSubmit: SubmitHandler<IAuthRequestRegistration> = (data: IAuthRequestRegistration) => {
    if (type === AuthType.REGISTER) {
      dispatch(registration({ ...data }));
    }

    if (type === AuthType.LOGIN) {
      const requestData = {
        username: data.username,
        password: data.hashed_password,
      };

      dispatch(logIn(requestData));
    }

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
    <div className={style.page}>
      <div className={style.container}>
        <h1 className={style.logoText}>
          Rekka <GiEnvelope className={style.logo} />
        </h1>
        <h2 className={style.title}>{type === AuthType.REGISTER ? 'Регистрация' : 'Войти'}</h2>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={style.label}>
            <p>Логин</p>
            <InputText
              placeholder="Логин"
              view="email"
              error={errors.username}
              className={style.input}
              {...register('username', {
                required: 'Это поле обязательно для заполнения!',
                pattern: {
                  value: EMAIL_REGEXP,
                  message: 'Некоректный email!',
                },
              })}
            />
          </label>
          <label className={style.label}>
            <p>Пароль</p>
            <InputText
              placeholder="Пароль"
              className={style.input}
              view="password"
              error={errors.hashed_password}
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
          </label>
          {type === AuthType.REGISTER && (
            <label className={style.label}>
              <p>Повторите пароль</p>
              <InputText
                placeholder="Повторите пароль"
                view="password"
                error={errors.repeatPassword}
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
          )}
          <button className={style.submit}>
            <input
              type="submit"
              value={type === AuthType.REGISTER ? 'Зарегистрироваться' : 'Войти'}
              disabled={!isValid}
            />
          </button>
        </form>
        <Link className={style.link} to={type === AuthType.REGISTER ? '/login' : '/auth'}>
          {type === AuthType.REGISTER ? 'У вас уже есть аккаунт?' : 'У вас нет аккаунта?'}
        </Link>
      </div>
    </div>
  );
};

export default AuthPage;
