import { useParams } from "react-router-dom";
import "./AnnouncementTitle.css";
import baseApi from "../../api/fetchAPI";
import { useEffect, useState } from "react";

const AnnouncementTitle = () => {
  const params = useParams();
  const [data, setData] = useState("");
  const list = ["회원정보", "학습", "오픈채팅", "대화연습", "보상", "기타"];

  useEffect(() => {
    baseApi.get(`board/announcement/${params.id}`).then((res) => {
      console.log(res.data.data);
      setData(res.data.data);
    });
  }, []);

  const date = data.updatedAt
    ? data.updatedAt.slice(0, 1) +
      "-" +
      data.updatedAt.slice(1, 2) +
      "-" +
      data.updatedAt.slice(2, 3)
    : "";

  return (
    <div className="qna-detail pt-3 pb-3 ps-4 pe-4 mt-2">
      <div className="d-flex justify-content-between mb-3">
        <div style={{fontSize:"1.25rem"}}>
          <p className="mt-2" >
            {"(" + list[data.announceCategoryId - 1] + ") "}
            {data.title}
          </p>
        </div>
        <div className="text-center">
          <p className="mt-1">{date}</p>
          <p className="mt-1">관리자</p>
        </div>
      </div>
      <div className="mt-5">{/* <p>{data.content}</p> */}</div>
    </div>
  );
};
export default AnnouncementTitle;
