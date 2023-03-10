'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';

import LogoImage from '../public/faviconB.svg';

const Header = () => {
  const [navList, setNavList] = useState([
    {
      title: 'Tistory',
      path: 'https://dev-ach.tistory.com/',
    },
    {
      title: 'Profile',
      path: '/profile',
    },
  ]);

  return (
    <header className="header">
      <div className="haeder-container flex-header">
        <h2 className="header-logo">
          <Link href="/">
            <Image
              width={60}
              height={60}
              priority
              src={LogoImage}
              title="DH logo"
              alt="DH logo"
            ></Image>
          </Link>
        </h2>
        <nav className="header-nav">
          {navList.map(({ title, path }) => {
            return (
              <Link href={path} title={title} key={title}>
                {title}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
