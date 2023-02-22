'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import 'dayjs/locale/ko';
import '../../styles/dust.scss';
import Loading from '../Loading';
export default function page() {
  const [itemList, setItemList] = useState([]);
  const [select, setSelect] = useState('서울');
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState([
    '서울',
    '부산',
    '대구',
    '인천',
    '광주',
    '대전',
    '울산',
    '경기',
    '강원',
    '충북',
    '충남',
    '전북',
    '전남',
    '경북',
    '경남',
    '제주',
    '세종',
  ]);

  const [error, setError] = useState(null);

  const getDust = async (sidoName) => {
    const baseUrl = '	https://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureSidoLIst';

    if (!sidoName) {
      return;
    }

    try {
      var queryParams =
        '?' +
        encodeURIComponent('serviceKey') +
        '=' +
        decodeURIComponent(process.env.NEXT_PUBLIC_OPEN_DUST_API);
      queryParams += '&' + encodeURIComponent('returnType') + '=' + encodeURIComponent('JSON');
      queryParams += '&' + encodeURIComponent('sidoName') + '=' + encodeURIComponent(sidoName);
      queryParams += '&' + encodeURIComponent('searchCondition') + '=' + encodeURIComponent('HOUR');

      const res = await axios.get(baseUrl + queryParams);

      const items = res.data.response.body.items;

      setItemList(items);

      setIsLoading(false);
    } catch (error) {
      setError(error.code);
      setIsLoading(false);
    }
  };

  const checkDust = (pm10Value, pm25Value) => {
    const sum = pm10Value + pm25Value;

    if (sum >= 0 || sum <= 50) {
      console.log('미세먼지 좋음');
      return 'dust0';
    } else if (sum > 50 || sum <= 125) {
      console.log('미세먼지 보통');
      return 'dust1';
    } else if (sum > 125 || sum <= 250) {
      console.log('미세먼지 나쁨');
      return 'dust2';
    } else {
      console.log('미세먼지 매우 나쁨');
      return 'dust3';
    }
  };

  const onClick = (e) => {
    const {
      target: { name },
    } = e;

    setIsLoading(true);

    setSelect(name);
    getDust(name);
  };

  useEffect(() => {
    setIsLoading(true);
    getDust(select);
  }, []);

  return (
    <>
      <title>Dust - D.ach</title>
      <div className="container dust-page">
        <h3>전국 미세먼지 실시간 정보</h3>
        <ul className="dust-list-box">
          {location.map((val) => {
            return (
              <li key={uuidv4()}>
                <button
                  disabled={isLoading}
                  className={val === select ? 'on' : null}
                  name={val}
                  onClick={onClick}
                >
                  {val}
                </button>
              </li>
            );
          })}
        </ul>
        <ul className="dust-list-box">
          {itemList.map(
            ({ cityName, no2Value, coValue, pm10Value, pm25Value, so2Value, o3Value }) => {
              return (
                <li key={uuidv4()} className={checkDust(pm10Value, pm25Value)}>
                  <ul className="info-box">
                    <li>
                      <em>지역</em>
                      <span>{cityName ? cityName : '-'}</span>
                    </li>
                    <li>
                      <em>이산화질소 평균농도</em>
                      <span>{no2Value ? no2Value : '-'}</span>
                    </li>
                    <li>
                      <em>일산화탄소 평균농도</em>
                      <span>{coValue ? coValue : '-'}</span>
                    </li>
                    <li>
                      <em>미세먼지 평균농도</em>
                      <span>{pm10Value ? pm10Value : '-'}</span>
                    </li>
                    <li>
                      <em>초미세먼지 평균농도</em>
                      <span>{pm25Value ? pm25Value : '-'}</span>
                    </li>
                    <li>
                      <em>아황산가스 평균농도</em>
                      <span>{so2Value ? so2Value : '-'}</span>
                    </li>
                    <li>
                      <em>오존 평균농도</em>
                      <span>{o3Value ? o3Value : '-'}</span>
                    </li>
                  </ul>
                </li>
              );
            },
          )}
        </ul>
        {isLoading && <Loading />}

        {error && <>{error}</>}
      </div>
    </>
  );
}
