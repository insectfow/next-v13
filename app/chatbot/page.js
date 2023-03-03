'use client';

import ChatBot from '../../components/ChatBot';

export default function page() {
  return (
    <>
      <title>ChatBot - D.ach</title>
      <div className="container">
        <h3>챗봇 기능</h3>
        <p>OpenAI에서 제공한 chat api를 활용해 챗봇 기능 구현</p>
        <ChatBot />
      </div>
    </>
  );
}
