import "./PronunciationRight.css";
import Text64 from "../../atoms/Text64";

const PronunciationRight = ({ data }) => {
  return (
    <div className="right">
      <Text64 text={data.data} />
    </div>
  );
};

export default PronunciationRight;
