import { useEffect, useState } from "react";
import baseApi from "../../api/fetchAPI";
import "./Ch2Notation.css";



const Ch2Notation = ({word}) => {
  // console.log(word.word);
  
  const [data, setData] = useState()
  const [pronounce, setPronounce] = useState()
  useEffect(() => {
    baseApi.get(`/study/detail/${word.studyId}/word`).then((res) => {
      setData(res.data.data.word)
      setPronounce(res.data.data.pronounce)
    })
  },[word.studyId])

  // console.log(data);
  console.log();

  return (
    <div className="ch2box rounded">
      {parseInt(word.chapterId) !== 6 ? <div className="abc">표기[발음]</div> : <div className="abc">표기</div>}
      <div className="data1">{data}</div>
      {parseInt(word.chapterId) !== 6 ? <div className="data2">{`[${pronounce}]`}</div>: <></>}
    </div>
  );
};

export default Ch2Notation;
