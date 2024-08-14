import "./PronunciationRight.css";
import Text64 from "../../atoms/Text64";

const PronunciationRight = ({data, location}) => {
  console.log(data);
  console.log(location);
  if (data === undefined) {
    alert("다시 말씀해주십쇼");
  }
  return (
    <div className="d-flex justify-content-center align-items-center text-center rounded-end">
      <Text64 text={data} location={location} />
    </div>
  );
};

export default PronunciationRight;
