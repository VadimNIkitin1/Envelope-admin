// import { ReactNode } from 'react';
import { useAppSelector } from '../../types/hooks';

import { clsx } from 'clsx';
import style from './Button.module.scss';
import { FC } from 'react';

// interface Props {
//   view: string;
//   type?: string;
//   children: ReactNode;
//   onClick?: () => void;
// }

const Button: FC<any> = ({ view, ...props }) => {
  const theme = useAppSelector((state) => state.active.theme);

  return (
    <button
      {...props}
      className={clsx(
        style.button,
        view === 'add' && style.add,
        view === 'delete' && style.delete,
        view === 'edit' && style.edit,
        theme && style.light
      )}
    />
  );
};

export default Button;
