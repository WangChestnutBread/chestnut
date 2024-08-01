import "./NotationChaper1.css";

const data = {
  code: 200,
  data: {
    word: "ㄱ",
    pronounce: "ㄱ",
  },
};

const NotationChaper1 = () => {
  return (
    <div className="d-flex justify-content-center align-items-center box rounded-2">
      <div className="title">필기</div>
      <div className="data1">{data.data.word}</div>
      <div className="data2">{`[${data.data.pronounce}]`}</div>
    </div>
  );
};
export default NotationChaper1;
