import { useParams } from 'react-router-dom';
import './QnaDetail.css'
import { useEffect, useState } from 'react';
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
      setDate(res.data.data.answerAt)
    }).catch((err) => {
      console.log(err);
    })
  },[])

  return (
    <div className="answer p-4 mb-4 mt-5 border-bottom border-2 border-black">
      <div className="d-flex justify-content-between mb-3">
        <div>{answer}</div>
        <div className="text-center">
          <p>{`${date[0]}-${date[1]}-${date[2]} `}</p>
          <p className="mt-3">관리자</p>
        </div>
      </div>
    </div>
  );
};
export default QnaAnswer