import { FC } from 'react';

import { useAppSelector } from '@/types/hooks';

import type { Props } from './TableCheckbox.types';
import { clsx } from 'clsx';
import style from './TableCheckbox.module.scss';

const TableCheckbox: FC<Props> = ({ checked, className, onChange }) => {
  const theme = useAppSelector((state) => state.active.theme);

  return (
    <div className={className}>
      <label className={style.container}>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <svg viewBox="0 0 64 64" height="18px" width="18px">
          <path
            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
            pathLength="575.0541381835938"
            className={clsx(style.path, checked && style.checked, theme && style.light)}
          ></path>
        </svg>
      </label>
    </div>
  );
};

export { TableCheckbox };
