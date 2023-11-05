import Table from '../../widgets/Table/Table';
import { settings } from '../../assets/db';

import { useAppSelector } from '../../types/hooks';
import ThemeSwitches from '../../shared/ThemeSwitches/ThemeSwitches';
import style from './SettingsPage.module.scss';

const SettingsPage = () => {
  const tableHeaderSettings = useAppSelector((state) => state.tableHeader.tableHeaderSettings);
  return (
    <>
      <Table data={settings} tableHeader={tableHeaderSettings} />
      <div className={style.themeSwitch}>
        <p>Тема</p>
        <ThemeSwitches />
      </div>
    </>
  );
};

export default SettingsPage;
