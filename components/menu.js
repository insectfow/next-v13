"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "../styles/menu.scss";

import robotImage from "../public/robot.svg";
import earthquakeImage from "../public/earthquake.svg";
import imageImage from "../public/image.svg";

export default function home() {
  const [menuList, setMenuList] = useState([
    {
      id: 1,
      title: "챗봇 기능",
      path: "/chatbot",
      image: {
        url: robotImage,
        alt: "robot icon",
      },
    },
    {
      id: 2,
      title: "지진 정보",
      path: "/earthquake",
      image: {
        url: earthquakeImage,
        alt: "earthquake icon",
      },
    },
    {
      id: 3,
      title: "이미지 생성",
      path: "/imagebot",
      image: {
        url: imageImage,
        alt: "image icon",
      },
    },
  ]);
  return (
    <>
      <ul className="menu-wrap">
        {menuList.map(({ id, title, path, image }) => {
          return (
            <li key={id}>
              <Link href={path}>
                <Image
                  width={36}
                  height={36}
                  src={image.url}
                  alt={image.alt}
                ></Image>
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
