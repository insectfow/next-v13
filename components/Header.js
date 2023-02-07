"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import LogoImage from "../public/faviconB.svg";

const Header = () => {
  const [navList, setNavList] = useState([
    {
      title: "Profile",
      path: "/profile",
    },
  ]);

  return (
    <header className="header">
      <div className="container flex-header">
        <h3 className="header-logo">
          <Link href="/">
            <Image
              width={60}
              height={60}
              src={LogoImage}
              title="DH logo"
              alt="DH logo"
            ></Image>
          </Link>
        </h3>
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
