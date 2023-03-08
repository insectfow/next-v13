'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../styles/menu.scss';

import robotImage from '../public/robot.svg';
import earthquakeImage from '../public/earthquake.svg';
import imageImage from '../public/image.svg';
import boardImage from '../public/board.svg';
import cloudImage from '../public/cloud.svg';
import fullpageImage from '../public/fullpage.svg';

export default function home() {
  const [menuList, setMenuList] = useState([
    {
      id: 1,
      title: '챗봇 기능',
      path: '/chatbot',
      image: {
        url: robotImage,
        alt: 'robot icon',
      },
    },
    {
      id: 2,
      title: '지진 속보',
      path: '/earthquake',
      image: {
        url: earthquakeImage,
        alt: 'earthquake icon',
      },
    },
    {
      id: 3,
      title: '이미지 생성',
      path: '/imagebot',
      image: {
        url: imageImage,
        alt: 'image icon',
      },
    },
    {
      id: 4,
      title: '방명록 작성',
      path: '/board',
      image: {
        url: boardImage,
        alt: 'board icon',
      },
    },
    {
      id: 5,
      title: '전국 미세먼지',
      path: '/dust',
      image: {
        url: cloudImage,
        alt: 'dust icon',
      },
    },
    {
      id: 6,
      title: 'Full Page',
      path: '/fullpage',
      image: {
        url: fullpageImage,
        alt: 'fullpage icon',
      },
    },
    {
      id: 7,
      title: 'Clone site',
      path: '/design',
      image: {
        url: imageImage,
        alt: 'clone site',
      },
    },
    // {
    //   id: 7,
    //   title: 'MixMa',
    //   path: '/mixma',
    //   image: {
    //     url: fullpageImage,
    //     alt: 'fullpage icon',
    //   },
    // },
  ]);
  return (
    <>
      <ul className="menu-wrap">
        {menuList.map(({ id, title, path, image }) => {
          return (
            <li key={id}>
              <Link href={path} title={title}>
                <Image width={36} height={36} src={image.url} alt={image.alt}></Image>
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
