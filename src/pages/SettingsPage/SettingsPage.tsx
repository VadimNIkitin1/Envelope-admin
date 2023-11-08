import Table from '../../widgets/Table/Table';
import { settings } from '../../assets/db';

import { TABLE_HEADER_SETTINGS } from './SettingsPage.data';
import ThemeSwitches from '../../shared/ThemeSwitches/ThemeSwitches';
import style from './SettingsPage.module.scss';

const SettingsPage = () => {
  return (
    <>
      <Table data={settings} tableHeader={TABLE_HEADER_SETTINGS} />
      <div className={style.themeSwitch}>
        <p>Тема</p>
        <ThemeSwitches />
      </div>
    </>
  );
};

export default SettingsPage;
