import { forwardRef } from 'react';

import { useAppSelector } from '@/types/hooks';

import { getAllActiveProperties } from '@/store/activeSlice/selectors';

import { clsx } from 'clsx';
import style from './Checkbox.module.scss';

const Checkbox = forwardRef<HTMLInputElement>(({ ...rest }, ref) => {
  const { theme } = useAppSelector((state) => getAllActiveProperties(state));

  return (
    <label className={style.container}>
      <input type="checkbox" {...rest} ref={ref} />
      <svg viewBox="0 0 64 64" height="18px" width="18px">
        <path
          d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
          pathLength="575.0541381835938"
          className={clsx(style.path, theme && style.light)}
        />
      </svg>
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

export { Checkbox };
