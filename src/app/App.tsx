import { RouterProvider } from 'react-router-dom';
import { useAppSelector } from '../types/hooks';

import router from './router';

import { clsx } from 'clsx';
import style from './App.module.scss';

function App() {
  const theme = useAppSelector((state) => state.active.theme);

  return (
    <div className={clsx(style.App, theme && style.light)}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
