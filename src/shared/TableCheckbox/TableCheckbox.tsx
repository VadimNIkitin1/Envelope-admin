import { useAppSelector } from '@/types/hooks';

import { clsx } from 'clsx';
import style from './TableCheckbox.module.scss';
import { FC, InputHTMLAttributes } from 'react';

const TableCheckbox: FC<InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const theme = useAppSelector((state) => state.active.theme);

  return (
    <div className={props.className}>
      <label className={style.container}>
        <input type="checkbox" {...props} />
        <svg viewBox="0 0 64 64" height="18px" width="18px">
          <path
            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
            pathLength="575.0541381835938"
            className={clsx(style.path, props.checked && style.checked, theme && style.light)}
          />
        </svg>
      </label>
    </div>
  );
};

export { TableCheckbox };
