import { useParams } from "react-router-dom";
import "./QnaDetail.css";
import baseApi from "../../api/fetchAPI";
import React, { useEffect, useState } from "react";
import useAuthStore from "../../stores/authStore";



const QnaDetail = () => {
  const params = useParams();
  console.log(params.id);
  const [data, setData] = useState("");
  const [nickname, setNickname] = useState("")
  const userId = useAuthStore((state) => state.userId) 
  console.log(userId);

  const list = ['랭킹', '오픈채팅', '학습', '게시판', '공지사항']

  useEffect(() => {
    baseApi.get(`/board/qna/${params.id}`).then((res) => {
      console.log(res);
      setData(res.data.data);
      setNickname(res.data.data.nickname)
    });
  },[]);
  //  console.log(data); 
  const date = data.createdAt ? `${data.createdAt[0]}-${data.createdAt[1]}-${data.createdAt[2]}` : ""
  console.log(date);

  return (
    <div className="qna-detail pt-3 pb-3 ps-4 pe-4 mt-3">
      <div className="d-flex justify-content-between">
        <div>
          <p className="mt-2" style={{fontSize:"1.25rem"}}>
            {'('+list[data.qnaCategoryId-1]+') '}
            {data.title}
          </p>
        </div>
        <div className="text-center">
          <p className="mt-1">{date}</p>
          <p className="mt-1">{nickname}</p>
        </div>
      </div>
      <div>
        <p style={{fontSize:"1.0rem", whiteSpace: "pre-wrap"}}>{data.content}</p>
      </div>
    </div>
  );
};
export default QnaDetail;
