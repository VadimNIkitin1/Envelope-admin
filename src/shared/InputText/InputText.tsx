import { forwardRef } from 'react';

import { useAppSelector } from '@/types/hooks';

import { IInputProps } from './InputText.types';
import { clsx } from 'clsx';
import styles from './InputText.module.scss';

const InputText = forwardRef<HTMLInputElement, IInputProps>(
  ({ error, style, className, view, ...rest }, ref) => {
    const theme = useAppSelector((state) => state.active.theme);

    return (
      <>
        <div className={clsx(styles.input, theme && styles.light, className)} style={style}>
          <input ref={ref} {...rest} type={view} />
        </div>
        <div>{error && <div className={styles.error}>{error.message}</div>}</div>
      </>
    );
  }
);

export { InputText };
