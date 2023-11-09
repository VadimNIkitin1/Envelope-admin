import Table from '../../widgets/Table/Table';
import { settings } from '../../assets/db';

import { TABLE_HEADER_SETTINGS } from './SettingsPage.data';
import ThemeSwitches from '../../shared/ThemeSwitches/ThemeSwitches';
import style from './SettingsPage.module.scss';
import { clsx } from 'clsx';
import { useAppSelector } from '../../types/hooks';

const SettingsPage = () => {
  const theme = useAppSelector((state) => state.active.theme);

  return (
    <>
      <Table data={settings} tableHeader={TABLE_HEADER_SETTINGS} />
      <div className={clsx(style.themeSwitch, theme && style.light)}>
        <p>Тема</p>
        <ThemeSwitches />
      </div>
    </>
  );
};

export default SettingsPage;
