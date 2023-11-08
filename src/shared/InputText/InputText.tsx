import { forwardRef } from 'react';
import { IInputProps } from './InputText.types';
import styles from './InputText.module.scss';
import { clsx } from 'clsx';

const InputText = forwardRef<HTMLInputElement, IInputProps>(
  ({ error, style, className, view, ...rest }, ref) => {
    return (
      <>
        <div className={clsx(styles.input, className)} style={style}>
          <input ref={ref} {...rest} type={view} />
        </div>
        <div>{error && <div className={styles.error}>{error.message}</div>}</div>
      </>
    );
  }
);

export { InputText };
