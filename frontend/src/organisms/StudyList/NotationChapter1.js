import { useEffect, useState } from "react";
import baseApi from "../../api/fetchAPI";
import "./NotationChapter1.css";



const NotationChapter1 = ({word, realData}) => {
  // console.log(word.word);
  console.log(realData);
  const [data, setData] = useState()
  useEffect(() => {
    baseApi.get(`/study/detail/${word.studyId}/word`).then((res) => {
      // console.log(12332312312313);
      // console.log(res);
      setData(res.data.data.word)

    })
  },[word.studyId])

  // console.log(data);

  return (
    <div className="box">
      {parseInt(word.chapterId) === 1 ? <div className="abc">표기[발음]</div> : <div className="abc">표기</div>}
      
      <div className="data1">{data}</div>
      {parseInt(word.chapterId) === 1 ? <div className="data2">{`[${data}]`}</div>: <></>}
      
    </div>
  );
};

export default NotationChapter1;
