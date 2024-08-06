import React, { useState, useEffect } from "react";
import ChapterList from "../molecules/StudyList/ChapterList";
import axios from "axios";
import useAuthStore from "../stores/authStore";
import { useParams } from "react-router-dom";

function Chapter2Listpage() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [data2, setData2] = useState([]);
  const { listId } = useParams();

  useEffect(() => {
    axios
      .get(`https://i11d107.p.ssafy.io/chestnutApi/study/chapter/${listId}`, {
        headers: {
          access: accessToken,
        },
      })
      .then((response) => {
        if (response.data.code === 200) {
          setData2(response.data.data);
        } else if (response.data.code === 801) {
          alert("유효하지 않은 토큰입니다.");
        } else if (response.data.code === 710) {
          alert("존재하지 않는 데이터입니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accessToken, listId]);

  return (
    <div>
      <ChapterList title={`CH${listId}. 한 글자`} />
      {/* 데이터를 확인하기 위해 추가 */}
      <div>
        {data2.map((item, index) => (
          <div key={index}>{item.word}</div>
        ))}
      </div>
    </div>
  );
}

export default Chapter2Listpage;
