import Text20 from "../../atoms/Text20";
import "./SentenceItem.css";

function SentenceItem({ sentence }) {
  return (
    <div className="SentenceItem">
      <img src="/image/CheckMark.png" width="20px" />
      <Text20 text={sentence} />
    </div>
  );
}

export default SentenceItem;
