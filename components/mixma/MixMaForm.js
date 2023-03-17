import { useState } from 'react';
import { dbService } from '../../lib/firebase';

import { collection, Timestamp, addDoc } from 'firebase/firestore';

export default function MixMaForm() {
  const [formState, setFormState] = useState({
    property: '',
    name: '',
    level: '',
    habitat: '',
    anger: false,
    range: '',
    gain: false,
    mixList: '',
    materialList: '',
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    const coreData = {
      ...formState,
      level: formState.level.split(','),
      mixList: formState.mixList ? formState.mixList.split(',') : [],
      createdAt: Timestamp.fromDate(new Date()),
    };

    try {
      await addDoc(collection(dbService, 'mixma'), coreData);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const reset = () => {
    setFormState({
      property: '',
      name: '',
      level: '',
      habitat: '',
      anger: false,
      range: '',
      gain: false,
      mixList: '',
      materialList: '',
    });
  };
  return (
    <form className="mixma-form" onSubmit={onSubmit}>
      <label>
        <span>헨치 속성</span>
        <input
          name="property"
          type="text"
          value={formState.property}
          placeholder="헨치 속성"
          onChange={onChange}
        />
      </label>
      <label>
        <span>헨치 이름</span>
        <input
          name="name"
          type="text"
          value={formState.name}
          placeholder="헨치 이름"
          onChange={onChange}
        />
      </label>
      <label>
        <span>헨치 레벨</span>
        <input
          name="level"
          type="text"
          value={formState.level}
          placeholder="헨치 레벨(기랩,만랩)"
          onChange={onChange}
        />
      </label>
      <label>
        <span>서식지</span>
        <input
          name="habitat"
          type="text"
          value={formState.habitat}
          placeholder="서식지"
          onChange={onChange}
        />
      </label>
      <label>
        <span>선공 유무</span>
        <input
          name="anger"
          type="checkbox"
          checked={formState.anger}
          placeholder="선공 유무"
          onChange={onChange}
        />
      </label>
      <label>
        <span>사거리</span>
        <input
          name="range"
          type="text"
          value={formState.range}
          placeholder="사거리"
          onChange={onChange}
        />
      </label>
      <label>
        <span>득코 여부</span>
        <input
          name="gain"
          type="checkbox"
          checked={formState.gain}
          placeholder="득코 여부"
          onChange={onChange}
        />
      </label>
      <label>
        <span>믹스법</span>
        <input
          name="mixList"
          type="text"
          value={formState.mixList}
          placeholder="믹스법"
          onChange={onChange}
        />
      </label>
      <label>
        <span>재료로 쓰이는 헨치리스트</span>
        <input
          name="materialList"
          type="text"
          value={formState.materialList}
          placeholder="재료로 쓰이는 헨치리스트"
          onChange={onChange}
        />
      </label>
      <button type="submit">저장하기</button>
    </form>
  );
}
