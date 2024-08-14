import { useEffect, useState } from "react";
import baseApi from "../../api/fetchAPI";
import "./Ch3Notation.css";

const Ch3Notation = ({word}) => {
  
  const [data, setData] = useState()
  useEffect(() => {
    baseApi.get(`/study/detail/${word.studyId}/word`).then((res) => {
      setData(res.data.data.word)

    })
  },[word.studyId])

  // console.log(data);
  console.log();

  return (
    <div className="ch3box rounded" style={{width:"300px"}}>
      {parseInt(word.chapterId) === 1 ? <div className="abc">표기[발음]</div> : <div className="abc">표기</div>}
      <div className="data1">{data}</div>
      {parseInt(word.chapterId) === 1 ? <div className="data2">{`[${data}]`}</div>: <></>}
    </div>
  );
};

export default Ch3Notation;
