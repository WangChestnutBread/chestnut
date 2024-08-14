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
    <div className="answer pt-3 pb-3 ps-4 pe-4 mb-4 mt-2">
      <div className="d-flex justify-content-between mb-3 row">
        <div className='word-wrap' style={{fontSize:"1.0rem", lineHeight: "normal", whiteSpace: "pre-wrap"}}>{content}</div>
        {/* <div className="text-center date-container col-2"></div> */}
      </div>
    </div>
  );
};
export default QnaAnswer