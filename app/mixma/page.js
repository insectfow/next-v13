'use client';

import { useState, useEffect } from 'react';
import { dbService } from '../../lib/firebase';

import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
  limit,
  Timestamp,
  addDoc,
  getDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

import '../../styles/mixma.scss';
import MixMaForm from '../../components/mixma/MixMaForm';

class BinarySearchTree {
  //BST의 constructor를 구현합니다.
  constructor(value, data) {
    this.value = value;
    this.data = data;
    this.left = null;
    this.right = null;
  }
  // tree에 value를 추가합니다.
  insert(value, data) {
    // 인자의 value가 this.value보다 작을 경우, 왼쪽 노드에서 진행합니다.
    if (value < this.value) {
      // this.left에 아무것도 없을 경우, 새로운 자식 노드를 추가합니다.
      if (this.left === null) {
        this.left = new BinarySearchTree(value, data);
      }
      // this.left의 자식 노드가 있을 경우, 자식 노드에서 insert 재귀를 사용합니다.
      else {
        this.left.insert(value, data);
      }
    }
    // 인자의 value가 this.value보다 클 경우, 오른쪽 노드에서 진행합니다.
    else if (value > this.value) {
      // this.right에 아무것도 없을 경우, 새로운 자식 노드를 추가합니다.
      if (this.right === null) {
        this.right = new BinarySearchTree(value, data);
      }
      // this.left의 자식 노드가 있을 경우, 자식 노드에서 insert 재귀를 사용합니다.
      else {
        this.right.insert(value, data);
      }
    } else {
      // 이미 value값을 포함하고 있습니다.
    }
  }
  // tree의 value값을 탐색합니다.
  contains(value) {
    // 찾는 value값이 노드의 value와 일치한다면, true를 리턴합니다.
    if (value === this.value) {
      return true;
    }
    // 찾는 value값이 노드의 value 보다 작다면, 왼쪽에서 contains의 재귀를 진행합니다.
    if (value < this.value) {
      return !!(this.left && this.left.contains(value));
    }
    // 찾는 value값이 노드의 value 보다 크다면, 오른쪽에서 contains의 재귀를 진행합니다.
    if (value > this.value) {
      return !!(this.right && this.right.contains(value));
    }
  }
  //tree를 전위 순회 합니다.
  preorder(callback) {
    callback(this.value);
    if (this.left) {
      this.left.preorder(callback);
    }
    if (this.right) {
      this.right.preorder(callback);
    }
  }
  // tree를 중위 순회 합니다
  inorder(callback) {
    if (this.left) {
      this.left.inorder(callback);
    }
    callback(this.value);
    if (this.right) {
      this.right.inorder(callback);
    }
  }
  //tree를 후위 순회 합니다
  postorder(callback) {
    if (this.left) {
      this.left.postorder(callback);
    }
    if (this.right) {
      this.right.postorder(callback);
    }
    callback(this.value);
  }
}

export default function MixPage() {
  // 코어리스트
  const [coreList, setCoreList] = useState([]);

  const [searchValue, setSearchValue] = useState('');

  const [resultList, setResultList] = useState([]);

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name != 'search') {
      return;
    }
    setSearchValue(value);
  };

  const mixData = (obj) => {
    const data = new BinarySearchTree(1, obj);

    if (obj.mixList.length <= 0) return;

    obj.mixList[0].forEach((element, idx) => {
      const split = element.split('/');
      console.log(split);
      data.insert(idx);
    });
    data.insert(2, '2');
    data.insert(4, '3');
    data.insert(5, '5');
    console.log(data);
  };

  const searchData = (name) => {
    if (!name) return;
    const res = coreList.filter((v) => v.name === name);

    return res;
  };

  const joinArray = (array) => {
    const list = Array.from(new Set(array));
    return list;
  };

  useEffect(() => {
    const q = query(collection(dbService, 'mixma'), orderBy('createdAt', 'asc'));
    onSnapshot(q, (snapShot) => {
      const dweetArr = snapShot.docs.map((doc) => {
        // docUpdate({ ...doc.data() }, doc.id);
        return { ...doc.data(), id: doc.id };
      });
      setCoreList(dweetArr);
    });
  }, []);

  const docUpdate = async (data, id) => {
    const docRef = doc(dbService, 'mixma', id);

    const updateData = await updateDoc(docRef, {
      level: {
        min: Number(data.level.min),
        max: Number(data.level.max),
      },
    });
  };

  useEffect(() => {
    const q = query(collection(dbService, 'mixma'), where('name', '==', searchValue));
    onSnapshot(q, (snapShot) => {
      const dweetArr = snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setResultList(dweetArr);
      // if (dweetArr.length > 0) {
      //   mixData(dweetArr[0]);
      // }
    });
  }, [searchValue]);

  return (
    <main className="container">
      {/* <MixMaForm /> */}
      {/* <input
        type="text"
        placeholder="족보 검색"
        name="search"
        value={searchValue}
        onChange={onChange}
      />
      <ul className="core-list">
        {resultList.map(
          ({ id, name, property, level, habitat, anger, range, gain, mixList, materialList }) => {
            return (
              <li key={id}>
                <ul>
                  <li>이름 : {name ? name : '-'}</li>
                  <li>속성 : {property ? property : '-'}</li>
                  <li>레벨 : {level ? level.min + '~' + level.max : '-'}</li>
                  <li>서식지 : {habitat ? habitat : '-'}</li>
                  <li>선공유무 : {anger ? '선공' : '비선공'}</li>
                  <li>공격범위 : {range ? range : '-'}</li>
                  <li>득코가능 : {gain ? '득코가능' : '득코불가'}</li>
                  <li>
                    {mixList.map((value, index) => {
                      return <span key={`mixList-${index}`}>{value}</span>;
                    })}
                  </li>
                  <li>{materialList}</li>
                </ul>
              </li>
            );
          },
        )}
      </ul> */}
      <ul className="core-list">
        {coreList.map(
          ({ id, name, property, level, habitat, anger, range, gain, mixList, materialList }) => {
            return (
              <li key={id}>
                <ul>
                  <li>이름 : {name ? name : '-'}</li>
                  <li>속성 : {property ? property : '-'}</li>
                  <li>레벨 : {level ? level.min + '~' + level.max : '-'}</li>
                  <li>서식지 : {habitat ? habitat : '-'}</li>
                  <li>선공유무 : {anger ? '선공' : '비선공'}</li>
                  <li>공격범위 : {range ? range : '-'}</li>
                  <li>득코가능 : {gain ? '득코가능' : '득코불가'}</li>
                  <li>
                    {mixList.map((value, index) => {
                      return <span key={`mixList-${index}`}>{value}</span>;
                    })}
                  </li>
                  <li>{materialList}</li>
                </ul>
              </li>
            );
          },
        )}
      </ul>
    </main>
  );
}
