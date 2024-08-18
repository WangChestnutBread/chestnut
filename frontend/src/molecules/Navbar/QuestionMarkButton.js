import { useState } from "react";
import "./QuestionMarkButton.css";
import Text24 from "../../atoms/Text24";
import Text20 from "../../atoms/Text20";

function QuestionMarkButton() {
  let [showGuide, setShowGuide] = useState(false);
  return (
    <div
      className="QuestionMarkButton"
      onClick={() => {
        setShowGuide(!showGuide);
      }}
    >
      <img src="/icons/QuestionMark.svg" height="100%" />
      {showGuide ? <UserGuide /> : null}
    </div>
  );
}

function UserGuide() {
  let [guide, setGuide] = useState("설명서 내용이 들어갈 예정이에용");
  return (
    <div className="UserGuide">
      <div className="Guide">
        <div className="GuideTitle">
          <Text24 text="어떻게 이용하나요?" />
        </div>
        <div className="GuideText">
          <Text20 text={guide} />
        </div>
      </div>
    </div>
  );
}

export default QuestionMarkButton;
