import { useEffect, useState } from 'react';
import './AnnouncementContent.css'
import baseApi from '../../api/fetchAPI';
import { useParams } from 'react-router-dom';


const QnaAnswer = () => {
  const params = useParams()
  const [content, setContent] = useState("")
  const [date, setDate] = useState("")


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
        <div className='word-wrap col-10' style={{fontSize:"1.2rem"}}>{content}</div>
        <div className="text-center date-container col-2">
        </div>
      </div>
    </div>
  );
};
export default QnaAnswer