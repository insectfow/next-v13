import { Inter } from '@next/font/google';

const font = Inter({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={font.className}>
      <head />
      <body>{children}</body>
    </html>
  );
}
