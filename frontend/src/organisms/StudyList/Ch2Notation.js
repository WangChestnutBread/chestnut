import { useEffect, useState } from "react";
import baseApi from "../../api/fetchAPI";
import "./Ch2Notation.css";



const Ch2Notation = ({word}) => {
  // console.log(word.word);
  
  const [data, setData] = useState()
  useEffect(() => {
    baseApi.get(`/study/detail/${word.studyId}/word`).then((res) => {
      setData(res.data.data.word)
    })
  },[word.studyId])

  // console.log(data);
  console.log();

  return (
    <div className="ch2box rounded">
      {parseInt(word.chapterId) === 1 ? <div className="abc">표기[발음]</div> : <div className="abc">표기</div>}
      <div className="data1">{data}</div>
      {parseInt(word.chapterId) === 1 ? <div className="data2">{`[${data}]`}</div>: <></>}
    </div>
  );
};

export default Ch2Notation;
