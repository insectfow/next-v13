import { useState, useEffect } from 'react';
import { dbService } from '../../lib/firebase';

import { collection, Timestamp, addDoc } from 'firebase/firestore';

export default function MixMaForm() {
  //   속성
  const [property, setProperty] = useState('');
  //   이름
  const [name, setName] = useState('');
  //   레벨
  const [level, setLevel] = useState('');
  //   서식지
  const [habitat, setHabitat] = useState('');
  //   선제 공격 유무
  const [anger, setAnger] = useState(false);
  //   공격범위
  const [range, setRange] = useState('');
  //   획득가능
  const [gain, setGain] = useState(false);
  //   믹스법
  const [mixList, setMixList] = useState('');
  //   이것이 재료로 쓰이는 헨치 리스트
  const [materialList, setMaterialList] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    // if (!property || !name || !level || !anger || !range || !gain) return;

    const coreData = {
      property: property, // 필수
      name: name, // 필수
      level: split(level), // 필수
      habitat: habitat,
      anger: anger, // 필수
      range: range, // 필수
      gain: gain, // 필수
      mixList: split(mixList),
      materialList: materialList,
      createdAt: Timestamp.fromDate(new Date()), // 필수
    };

    dataPush(coreData);
  };

  const split = (str) => {
    return str.split(',');
  };

  const onChange = (e) => {
    const {
      target: { value, name, checked },
    } = e;

    if (name === 'name') {
      setName(value);
    } else if (name === 'level') {
      setLevel(value);
    } else if (name === 'habitat') {
      setHabitat(value);
    } else if (name === 'anger') {
      setAnger(checked);
    } else if (name === 'range') {
      setRange(value);
    } else if (name === 'gain') {
      setGain(checked);
    } else if (name === 'mixList') {
      setMixList(value);
    } else if (name === 'materialList') {
      setMaterialList(value);
    } else if (name === 'property') {
      setProperty(value);
    }
  };

  const reset = () => {
    setProperty('');
    setName('');
    setLevel('');
    setHabitat('');
    setAnger(false);
    setRange('');
    setGain(false);
    setMaterialList('');
    setMixList('');
  };

  const dataPush = async (data) => {
    try {
      await addDoc(collection(dbService, 'mixma'), data);
      reset();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form className="mixma-form" onSubmit={onSubmit}>
      <label>
        <span>헨치 속성</span>
        <input
          name="property"
          type="text"
          value={property}
          placeholder="헨치 속성"
          onChange={onChange}
        />
      </label>
      <label>
        <span>헨치 이름</span>
        <input name="name" type="text" value={name} placeholder="헨치 이름" onChange={onChange} />
      </label>
      <label>
        <span>헨치 레벨</span>
        <input
          name="level"
          type="text"
          value={level}
          placeholder="헨치 레벨(기랩,만랩)"
          onChange={onChange}
        />
      </label>
      <label>
        <span>서식지</span>
        <input
          name="habitat"
          type="text"
          value={habitat}
          placeholder="서식지"
          onChange={onChange}
        />
      </label>
      <label>
        <span>선공 유무</span>
        <input
          name="anger"
          type="checkbox"
          checked={anger}
          placeholder="선공 유무"
          onChange={onChange}
        />
      </label>
      <label>
        <span>사거리</span>
        <input name="range" type="text" value={range} placeholder="사거리" onChange={onChange} />
      </label>
      <label>
        <span>득코 여부</span>
        <input
          name="gain"
          type="checkbox"
          checked={gain}
          placeholder="득코 여부"
          onChange={onChange}
        />
      </label>
      <label>
        <span>믹스법</span>
        <input
          name="mixList"
          type="text"
          value={mixList}
          placeholder="믹스법"
          onChange={onChange}
        />
      </label>
      <label>
        <span>재료로 쓰이는 헨치리스트</span>
        <input
          name="materialList"
          type="text"
          value={materialList}
          placeholder="재료로 쓰이는 헨치리스트"
          onChange={onChange}
        />
      </label>
      <button type="submit">저장하기</button>
    </form>
  );
}
