import axios from "axios";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "../styles/chatbot.scss";

import Image from "next/image";

import robotImage from "../public/robot.svg";
import userImage from "../public/user.svg";

import Loading from "../app/Loading";

const ChatBot = () => {
  // 질문
  const [questions, setQuestions] = useState();
  // 챗데이터
  const [chat, setChat] = useState([]);
  // 챗 로딩
  const [waitAnswer, setWaitAnswer] = useState(false);

  const chatAi = async (data) => {
    // 비동기처리해서 axios로 API 요청, body에 데이터 담았고, headers에 Authorization 밸류에 api코드를 넘겨줘
    try {
      const pos = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "text-davinci-003",
          prompt: `${data}`,
          temperature: 0.9,
          max_tokens: 300,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0.6,
          stop: [" Human:", " AI:"],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(process.env.NEXT_PUBLIC_OPEN_API),
          },
        }
      );
      // pos.data.choices[0].text가 채팅 데이터구나. id까지 담아서 chat 변수에 같이 담아줘

      setChat((prev) => [
        ...prev,
        { text: pos.data.choices[0].text, id: pos.data.id },
      ]);
      // 데이터 처리가 끝나면 로딩을 풀어줘
      setWaitAnswer((prev) => !prev);
    } catch (error) {
      // 에러시 로딩 풀고 오류 팝업, 데이터 리셋하네
      setWaitAnswer((prev) => !prev);

      alert(error.message);
      setQuestions("");
      setChat([]);
    }
  };

  // form 버튼을 눌렀을 때 Questions에 데이터를 업데이트해줘
  const questionsHandler = (e) => {
    const {
      target: { value },
    } = e;
    setQuestions(value);
  };

  //   questions이 없으면 멈추고, 있으면 로딩걸고 chat에 데이터 붙여 그리고 chatAI 함수 실행, Questions변수는 리셋
  const submitQuestion = (e) => {
    e.preventDefault();

    if (!questions) {
      return null;
    }
    setWaitAnswer((prev) => !prev);
    setChat((prev) => [...prev, { text: questions, id: uuidv4() }]);
    chatAi(questions);
    setQuestions("");
  };

  return (
    <div className="chat-bot-wrap">
      <h3>Ai와 채팅해보세요</h3>
      <div className="chat-box-list">
        {chat.map((el, idx) => {
          return (
            <div
              key={el.id}
              className={idx % 2 === 0 ? "user-chat-box" : "robot-chat-box"}
            >
              {idx % 2 === 0 ? (
                <>
                  <span>{el.text}</span>
                  <Image
                    width={30}
                    height={30}
                    src={userImage}
                    alt="user icon"
                  />
                </>
              ) : (
                <>
                  <Image
                    width={30}
                    height={30}
                    src={robotImage}
                    alt="user icon"
                  />
                  <span>{el.text}</span>
                </>
              )}
            </div>
          );
        })}
      </div>
      <form className="chat-input" onSubmit={submitQuestion}>
        <input
          onChange={questionsHandler}
          value={questions || ""}
          disabled={waitAnswer}
          placeholder="챗봇에게 물어보기"
        />
        <button type="submit" disabled={waitAnswer}>
          전송
        </button>
      </form>
      {waitAnswer && <Loading />}
    </div>
  );
};

export default ChatBot;
