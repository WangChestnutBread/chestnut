

import { useParams } from "react-router-dom";
import "./NotationChapter1.css";



const NotationChapter1 = (word) => {
  console.log(word.word);

  return (
    <div className="box">
      {word.word.studyId ? <div className="abc">표기[발음]</div> : <div className="abc">표기</div>}
      
      <div className="data1">{word.word.word}</div>
      {word.word.studyId ? <div className="data2">{`[${word.word.word}]`}</div>: <></>}
      
    </div>
  );
};

export default NotationChapter1;
