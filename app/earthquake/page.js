'use client';

import axios from 'axios';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import '../../styles/earthquake.scss';
import Loading from '../Loading';

import noImage from '../../public/no-image.svg';
export default function page() {
  const [itemList, setItemList] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    dayjs.locale('ko');
    const getEqk = async () => {
      const baseUrl = 'https://apis.data.go.kr/1360000/EqkInfoService/getEqkMsg';
      try {
        var queryParams =
          '?' +
          encodeURIComponent('serviceKey') +
          '=' +
          decodeURIComponent(process.env.NEXT_PUBLIC_OPEN_EARTH_API);
        queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON');
        queryParams +=
          '&' +
          encodeURIComponent('fromTmFc') +
          '=' +
          encodeURIComponent(dayjs().subtract(3, 'day').format('YYYYMMDD'));
        queryParams +=
          '&' + encodeURIComponent('toTmFc') + '=' + encodeURIComponent(dayjs().format('YYYYMMDD'));

        const res = await axios.get(baseUrl + queryParams);

        setItemList(res.data.response.body.items.item);
      } catch (error) {
        setError(error.code);
      }
    };
    getEqk();
  }, []);

  return (
    <>
      <title>earthquake - D.ach</title>
      <div className="container earthquake-page">
        <h3>지진 속보</h3>
        <ul className="earthquake-list-box">
          {itemList.length > 0 ? (
            itemList.map(({ img, rem, inT, mt, loc, stnId, lat, lon, tmEqk, dep }) => {
              return (
                <li key={uuidv4()}>
                  <div className="image-box">
                    {img ? (
                      // <img src={img} alt="지진 위치 이미지"></img>
                      <Image
                        width={300}
                        height={300}
                        src={img}
                        alt="지진 위치 이미지"
                        loading="lazy"
                      />
                    ) : (
                      <Image width={300} height={300} src={noImage} alt="이미지 없음 이미지" />
                    )}
                  </div>
                  <ul className="info-box">
                    <li>
                      <em>규모</em>
                      <span>{mt ? mt : '-'}</span>
                    </li>
                    <li>
                      <em>진앙지</em>
                      <span>{loc ? loc : '-'}</span>
                    </li>
                    <li>
                      <em>참고사항</em>
                      <span>{rem ? rem : '-'}</span>
                    </li>
                    <li>
                      <em>진앙 시각</em>
                      <span>
                        {tmEqk
                          ? dayjs(String(tmEqk), 'YYYYMMDDHHmmss').format(
                              'YYYY. MM. DD. HH시 mm분 ss초',
                            )
                          : '-'}
                      </span>
                    </li>
                    <li>
                      <em>위도</em>
                      <span>{lat ? lat : '-'}</span>
                    </li>
                    <li>
                      <em>경도</em>
                      <span>{lon ? lon : '-'}</span>
                    </li>
                    <li>
                      <em>발생깊이</em>
                      <span>{dep ? dep + 'km' : '-'}</span>
                    </li>
                    <li>
                      <em>진도</em>
                      <span>{inT ? inT : '-'}</span>
                    </li>
                  </ul>
                </li>
              );
            })
          ) : (
            <Loading />
          )}
        </ul>
        {error && <>{error}</>}
      </div>
    </>
  );
}
