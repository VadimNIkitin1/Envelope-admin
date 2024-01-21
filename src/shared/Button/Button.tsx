import { ButtonHTMLAttributes, FC } from 'react';

import { useAppSelector } from '@/types/hooks';

import { getAllActiveProperties } from '@/store/activeSlice/selectors';

import { clsx } from 'clsx';
import styles from './Button.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  view: string;
}

const Button: FC<Props> = ({ view, ...props }) => {
  const { theme } = useAppSelector((state) => getAllActiveProperties(state));

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
