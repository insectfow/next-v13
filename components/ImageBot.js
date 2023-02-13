import axios from "axios";
import React, { useState } from "react";
import Loading from "../app/Loading";
import { v4 as uuidv4 } from "uuid";

import "../styles/imagebot.scss";
const ImageBot = () => {
  const [waitAnswer, setWaitAnswer] = useState(false);
  const [text, setText] = useState();
  const [images, setImages] = useState([]);

  const [sizes, setSizes] = useState("256");

  const getImage = async (keyword, sizes) => {
    let size = null;

    if (sizes) {
      size = `${sizes}x${sizes}`;
    }

    try {
      const pos = await axios.post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt: keyword,
          n: 1,
          size: size ? size : "1024x1024",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(process.env.NEXT_PUBLIC_OPEN_API),
          },
        }
      );

      setImages((prev) => [
        ...prev,
        { url: pos.data.data[0].url, id: uuidv4(), title: keyword },
      ]);

      setText("");

      // 데이터 처리가 끝나면 로딩을 풀어줘
      setWaitAnswer((prev) => !prev);
    } catch (error) {
      // 에러시 로딩 풀고 오류 팝업, 데이터 리셋하네
      setWaitAnswer((prev) => !prev);

      alert(error.message);
      setImages([]);
      setText("");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      return null;
    }

    setWaitAnswer((prev) => !prev);
    getImage(text, sizes);
    setText("");
  };

  const onChange = (e) => {
    const {
      target: { value, name },
    } = e;

    if (name === "keyword") {
      setText(value);
    }
  };

  const onSize = (e) => {
    const {
      target: { name },
    } = e;
    setSizes(name);

    console.log(sizes);
  };
  return (
    <>
      <div className="image-bot-wrap">
        <h3>AI가 키워드로 이미지를 만들어줘요</h3>
        <form className="image-input" onSubmit={onSubmit}>
          <input
            type="text"
            onChange={onChange}
            value={text || ""}
            disabled={waitAnswer}
            name="keyword"
            placeholder="키워드를 입력해줄래?"
          />
          <button
            className={sizes == 256 ? "on" : null}
            type="button"
            name="256"
            onClick={onSize}
            disabled={waitAnswer}
          >
            256
          </button>
          <button
            className={sizes == 512 ? "on" : null}
            type="button"
            name="512"
            onClick={onSize}
            disabled={waitAnswer}
          >
            512
          </button>
          <button
            className={sizes == 1024 ? "on" : null}
            type="button"
            name="1024"
            onClick={onSize}
            disabled={waitAnswer}
          >
            1024
          </button>
          <button type="submit" disabled={waitAnswer}>
            이미지 생성
          </button>
        </form>

        <ul className="image-box-list">
          {images.map(({ url, id, title }) => {
            return (
              <li key={id}>
                <figure>
                  <img src={url} alt="ai image"></img>
                </figure>
                <div>
                  <h3>{title && "제목명 : " + title}</h3>
                  <a href={url} download="record_sample" target="_blank">
                    다운로드
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
        {waitAnswer && <Loading />}
      </div>
    </>
  );
};

export default ImageBot;
