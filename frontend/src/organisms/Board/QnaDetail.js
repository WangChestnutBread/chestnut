import { useParams } from "react-router-dom";
import "./QnaDetail.css";
import baseApi from "../../api/fetchAPI";
import { useEffect, useState } from "react";

const announcement = ['랭킹', ]

const answer = {
  answer: "답변 내용은 이러합니다.",
  answer_at: "2024.05.27",
  name: "관리자",
};

const QnaDetail = () => {
  const params = useParams();
  const [data, setData] = useState("");
  const list = ['랭킹', '오픈채팅', '학습', '게시판', '공지사항']

  useEffect(() => {
    baseApi.get(`board/announcement/${params.id}`).then((res) => {
      console.log(res.data.data);
      setData(res.data.data);
    });
  },[]);

  const date = data.updatedAt ? data.updatedAt.slice(0,10) : ""

  return (
    <div className="qna-detail p-4 mb-4 mt-5 border-top border-4 border-black">
      <div className="d-flex justify-content-between mb-3">
        <div>
          <p className="mt-2">
            {'('+list[data.announceCategoryId-1]+')'}
            {data.title}
          </p>
        </div>
        <div className="text-center">
          <p>{date}</p>
          <p className="mt-3">{data.loginId}</p>
        </div>
      </div>
      <div className="mt-5">
        <p>{data.content}</p>
      </div>
    </div>
  );
};
export default QnaDetail;
