import { forwardRef } from 'react';
import { IInputProps } from './InputText.types';
import styles from './InputText.module.scss';
import { clsx } from 'clsx';
import { useAppSelector } from '../../types/hooks';

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
