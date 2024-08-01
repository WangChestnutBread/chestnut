import { useNavigate } from "react-router-dom";
import Text20 from "../../atoms/Text20";
import "./IconWithText.css";

function IconWithText({ text, path }) {
  let navigate = useNavigate()
  return (
    <div className="IconWithText" onClick={() => { navigate(path) }}>
      <img src="/icons/ChestNut.svg" className="ChestNut" />
      <div className="TextStyle">
        <Text20 text={text} />
      </div>
    </div>
  );
}

export default IconWithText;
