import AuthForm from '../../widgets/AuthForm/AuthForm';
import style from './AuthPage.module.scss';

const LoginPage = () => {
  return (
    <div className={style.page}>
      <AuthForm />
    </div>
  );
};

export default LoginPage;
