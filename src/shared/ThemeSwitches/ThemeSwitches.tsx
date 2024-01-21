import { getAllActiveProperties, toggleTheme } from '@/store/activeSlice';

import { useAppSelector, useAppDispatch } from '@/types/hooks';

import style from './ThemeSwitches.module.scss';

const ThemeSwitches = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => getAllActiveProperties(state));

  const handleClickTheme = (target) => {
    target.preventDefault();
    dispatch(toggleTheme());
  };

  return (
    <div
      className={style.toggle_switch}
      onClick={(target) => {
        handleClickTheme(target);
      }}
      onKeyDown={(target) => handleClickTheme(target)}
      role="button"
      tabIndex={0}
    >
      <label className={style.switch_label}>
        <input type="checkbox" checked={theme} readOnly className={style.checkbox} />
        <span className={style.slider} />
      </label>
    </div>
  );
};

export { ThemeSwitches };
