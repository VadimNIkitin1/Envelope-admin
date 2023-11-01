import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { GiEnvelope } from 'react-icons/gi';

import { toggleAuth } from '../../store/authSlice';

import { useAppSelector, useAppDispatch } from '../../types/hooks';

import style from './AuthForm.module.scss';

const AuthForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth.auth);
  const company_id = useAppSelector((state) => state.auth.company_id);
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });

  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

  const PASSWORD_REGEXP = /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*?()]).*$/iu;

  const onSubmit = () => {
    dispatch(toggleAuth(true));

    reset();
  };

  useEffect(() => {
    if (auth) {
      navigate(`/${company_id}/shops`, { replace: true });
    }
  }, [auth]);

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
            {...register('login', {
              required: 'Это поле обязательно для заполнения!',
              pattern: {
                value: EMAIL_REGEXP,
                message: 'Некоректный email!',
              },
            })}
          />
          {errors.login && <p className={style.errorMsg}>{errors.login.message}</p>}
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
        <label className={style.label}>
          <p>Повторите пароль</p>
          <input
            className={style.input}
            type="password"
            {...register('repeatPassword', {
              required: 'Это поле обязательно для заполнения!',
              validate: (value, allValues) => {
                const { password } = allValues;
                return password === value;
              },
            })}
          />
          {getValues('repeatPassword') !== getValues('password') && (
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
