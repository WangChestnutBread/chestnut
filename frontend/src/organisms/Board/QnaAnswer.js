import { useParams } from 'react-router-dom';
import './QnaDetail.css'
import React, { useEffect, useState } from 'react';
import baseApi from '../../api/fetchAPI';



const QnaAnswer = () => {
  const params = useParams("")
  const [answer, setAnswer] = useState("")
  const [date, setDate] = useState([])
  console.log(params);

  useEffect(() => {
    baseApi(`/board/qna/${params.id}`).then((res) => {
      console.log(res)
      setAnswer(res.data.data.answer)
      setDate(res.data.data.createdAt)
    }).catch((err) => {
      console.log(err);
    })
  },[])

  const formatAnswer = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br/>
      </React.Fragment>
    ));
  };

  return (
    <div className="answer pt-3 pb-3 ps-4 pe-4 mb-4 mt-2">
      <div className="d-flex justify-content-between mb-3">
        <div style={{fontSize:"1.0rem", whiteSpace: "pre-wrap"}}>{formatAnswer(answer)}</div>
        <div className="text-center">
          <p className="mt-1">{date[0]}-{date[1]}-{date[2]}</p>
          <p className="mt-1">관리자</p>
        </div>
      </div>
    </div>
  );
};
export default QnaAnswer