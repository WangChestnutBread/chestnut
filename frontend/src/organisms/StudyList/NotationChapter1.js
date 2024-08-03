// NotationChapter1.js

import "./NotationChapter1.css";

const data = {
  code: 200,
  data: {
    word: "ㄱ",
    pronounce: "ㄱ",
  },
};

const NotationChapter1 = () => {


  return (
    <div className="box">
      <div className="abc">표기[발음]</div>
      <div className="data1">{data.data.word}</div>
      <div className="data2">{`[${data.data.pronounce}]`}</div>
    </div>
  );
};

export default NotationChapter1;
