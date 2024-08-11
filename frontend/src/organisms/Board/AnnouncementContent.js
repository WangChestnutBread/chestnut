import { useEffect, useState } from 'react';
import './AnnouncementContent.css'
import baseApi from '../../api/fetchAPI';
import { useParams } from 'react-router-dom';

const answer = {
  answer: "답변 내용은 이러합니다.",
  answer_at: "2024.05.27",
  name: "관리자",
};

const QnaAnswer = () => {
  const params = useParams()
  const [content, setContent] = useState("")
  const [date, setDate] = useState("")

  // console.log(params.id);

  useEffect(() => {
    baseApi.get(`board/announcement/${params.id}`).then((res)=> {
      console.log(res.data.data);
      setContent(res.data.data.content)
      setDate(res.data.data.updatedAt)
    })
  },[])
  return (
    <div className="answer p-4 mb-4 border-bottom border-2 border-black">
      <div className="d-flex justify-content-between mb-3 row">
        <div className='word-wrap col-10'>{content}</div>
        <div className="text-center date-container col-2">
          <p>{date.slice(0,1)+"-"+ date.slice(1,2)+"-"+date.slice(2,3)}</p>
          <p className="mt-3 ">관리자</p>
        </div>
      </div>
    </div>
  );
};
export default QnaAnswer