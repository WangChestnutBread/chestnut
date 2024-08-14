import "./PronunciationLeft.css";
import Text24 from "./../../atoms/Text24";

const PronunciationLeft = ({ data }) => {
  return (
    <div className=" d-flex justify-content-center align-items-center rounded-start">
      <Text24 text={data} />
    </div>
  );
};

export default PronunciationLeft;
