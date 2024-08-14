import "./PronunciationLeft.css";
import Text24 from "../../atoms/Text24";

const Ch5PronunciationLeft = ({ data }) => {
  return (
    <div className="left d-flex justify-content-center align-items-center rounded-start">
      <Text24 text={data} />
    </div>
  );
};

export default Ch5PronunciationLeft;
