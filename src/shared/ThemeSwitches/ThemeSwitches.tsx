import { toggleTheme } from '../../store/activeSlice';

import { useAppSelector, useAppDispatch } from '../../types/hooks';

import style from './ThemeSwitches.module.scss';

const ThemeSwitches = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.active.theme);

  return (
    <div
      className={style.toggle_switch}
      onClick={(target) => {
        target.preventDefault();
        return dispatch(toggleTheme());
      }}
    >
      <label className={style.switch_label}>
        <input type="checkbox" checked={theme} readOnly className={style.checkbox} />
        <span className={style.slider}></span>
      </label>
    </div>
  );
};

export default ThemeSwitches;
