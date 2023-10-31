import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
import ReactDOM from 'react-dom/client';
import App from '../src/app/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
