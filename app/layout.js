'use client';

import Router from '../components/Router';
import '../styles/global.css';

import store from '../store/index';
import { Provider } from 'react-redux';

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head />
      <body>
        <Provider store={store}>
          <Router children={children} />
        </Provider>
      </body>
    </html>
  );
}
