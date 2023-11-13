import { RouterProvider } from 'react-router-dom';
import { useAppSelector } from '../types/hooks';
import { ChakraProvider } from '@chakra-ui/react';

import router from './router';

import { clsx } from 'clsx';
import style from './App.module.scss';

function App() {
  const theme = useAppSelector((state) => state.active.theme);

  return (
    <div className={clsx(style.App, theme && style.light)}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </div>
  );
}

export default App;
