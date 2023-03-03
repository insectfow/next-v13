'use client';

import ImageBot from '../../components/ImageBot';

export default function page() {
  return (
    <>
      <title>ImageBot - D.ach</title>
      <div className="container image-bog-page">
        <h3>이미지를 생성해주는 기능</h3>
        <p>
          OpenAI에서 제공해주는 Image API로 입력된 텍스트를 값을 토대로 이미지를 생성해주는
          기능입니다.
        </p>
        <ImageBot />
      </div>
    </>
  );
}
