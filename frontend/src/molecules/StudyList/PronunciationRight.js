import "./PronunciationRight.css";
import Text64 from "../../atoms/Text64";

const PronunciationRight = ( data ) => {
  console.log(data);
  return (
    <div className="right d-flex justify-content-center align-items-center">
      <Text64 text={data.data} />
    </div>
  );
};

export default PronunciationRight;
