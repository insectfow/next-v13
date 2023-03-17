'use client';
import '../../styles/table.scss';
import { useState } from 'react';

export default function Page() {
  const [tables, setTables] = useState({
    head: ['첫번째 제목', '두번째 제목', '세번째 제목', '네번째 데이터'],
    lists: [
      {
        data: 1,
        data2: 2,
        data3: 4,
        data4: 1,
      },
      {
        data: 1,
        data2: 2,
        data3: 4,
      },
      {
        data: 1,

        data3: 4,
      },
      {
        data: 1,
        data2: 2,
        data3: 4,
        data4: 1,
      },
      {
        data: 1,
        data2: 2,
        data3: 4,
      },
    ],
  });

  function objectToArray(obj) {
    // 오브젝트 데이터를 배열로 만들어주는 함수 objectToArray 선언
    return Object.keys(obj).map(function (key) {
      // obj의 key값들을 배열로 만들고, map 함수를 이용하여 key값들을 순회하며 새로운 배열을 만듦
      return [key, obj[key]]; // key와 obj[key]를 배열로 만들어 반환
    });
  }

  const datas = objectToArray(tables.lists[0]);

  console.log(datas);
  return (
    <div className="container">
      <div className="table-wrap">
        <div className="table-row head">
          {tables.head.map((value) => {
            return (
              <div className="table-cell" key={value + 'header'}>
                <span>{value}</span>
              </div>
            );
          })}
        </div>
        {tables.lists.map(({ data, data2, data3, data4 }, index) => {
          return (
            <div className="table-row" key={index + 'data'}>
              {data && (
                <div className="table-cell">
                  <span>{data}</span>
                </div>
              )}
              {data2 && (
                <div className="table-cell">
                  <span>{data2}</span>
                </div>
              )}
              {data3 && (
                <div className="table-cell">
                  <span>{data3}</span>
                </div>
              )}
              {data4 && (
                <div className="table-cell">
                  <span>{data4}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
