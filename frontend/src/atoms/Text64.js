import React, { useEffect } from "react";
import axios from "axios";

function Text64({ text, location }) {
  console.log(location)

  // 문자열을 배열로 변환하고, 각 문자에 스타일을 적용한 span 요소를 반환
  const styledText = text.split('').map((char, index) => {
    // location 배열에 현재 index가 포함되어 있는지 확인
    const isHighlighted = location.includes(index+1);
    return (
      <span key={index} style={{ color: isHighlighted ? 'red' : 'black' }}>
        {char}
      </span>
    )
  })

  useEffect(() => {
    // 서버와 통신하는 함수
    const fetchData = async () => {
      try {
        const response = await axios.get('https://your-api-endpoint.com/api');
        console.log('Server response:', response.data);
        // 서버 응답 데이터 처리
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData()
  }, []) // 빈 의존성 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행되도록 함
  console.log(styledText);
  return (
  <div>
    {styledText.length > 10 ? ( <p style={{ fontSize: '2rem' }}>
      {styledText}
    </p>) : ( <p style={{ fontSize: '4rem' }}>
      {styledText}
    </p>) }
    </div>
  )
}

export default Text64;
