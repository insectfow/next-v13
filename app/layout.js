'use client';

import Router from '../components/Router';
import '../styles/global.css';

import { Inter } from '@next/font/google';

const font = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
});
import store from '../store/index';
import { Provider } from 'react-redux';

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={font.className}>
      <head />
      <body>
        <Provider store={store}>
          <Router children={children} />
        </Provider>
      </body>
    </html>
  );
}
