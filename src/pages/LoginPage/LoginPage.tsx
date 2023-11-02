import LoginForm from '../../widgets/LoginForm/LoginForm';
import style from './LoginPage.module.scss';

const LoginPage = () => {
  return (
    <div className={style.page}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
