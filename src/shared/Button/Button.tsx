import { ButtonHTMLAttributes, FC } from 'react';

import { useAppSelector } from '@/types/hooks';

import { clsx } from 'clsx';
import styles from './Button.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  view: string;
}

const Button: FC<Props> = ({ view, ...props }) => {
  const theme = useAppSelector((state) => state.active.theme);

  return (
    <button
      {...props}
      className={clsx(
        styles.button,
        view === 'add' && styles.add,
        view === 'delete' && styles.delete,
        theme && styles.light
      )}
    />
  );
};

export { Button };
