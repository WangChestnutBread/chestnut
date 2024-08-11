import { useParams } from "react-router-dom";
import "./QnaDetail.css";
import baseApi from "../../api/fetchAPI";
import { useEffect, useState } from "react";
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

  const date = data.updatedAt ? data.updatedAt.slice(0,10) : ""
  console.log(date);
  return (
    <div className="qna-detail p-4 mb-5 mt-5 border-top border-4 border-black">
      <div className="d-flex justify-content-between mb-3">
        <div>
          <p className="mt-2">
            {'('+list[data.qnaCategoryId-1]+') '}
            {data.title}
          </p>
        </div>
        <div className="text-center">
          <p>{date}</p>
          <p className="mt-3">{nickname}</p>
        </div>
      </div>
      <div>
        <p>{data.content}</p>
      </div>
    </div>
  );
};
export default QnaDetail;
