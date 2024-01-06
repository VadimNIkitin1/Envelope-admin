import notFoundImage from '@/assets/not-found.png';

import style from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <div className={style.container}>
      <img src={notFoundImage} alt="" width={'700px'} />
    </div>
  );
};

export { NotFoundPage };
