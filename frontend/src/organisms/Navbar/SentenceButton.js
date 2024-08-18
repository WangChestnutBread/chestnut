import "./SentenceButton.css";
import Text24 from "../../atoms/Text24";
import SentenceItem from "../../molecules/Navbar/SentenceItem";
import { useState } from "react";
import baseApi from "../../api/fetchAPI";

function SentenceButton({ sentences }) {
  let [showSentence, setShowSentence] = useState(false);

  return (
    <div className="SentenceButton">
      <img
        src="/icons/Book.svg"
        onClick={() => {
          setShowSentence(!showSentence);
        }}
      />
      {showSentence && sentences.length > 0 ? (
        <RelatedSentence sentences={sentences} />
      ) : showSentence && sentences.length === 0 ? (
        <RelatedSentence sentences={["관련 단어가 없습니다"]} />
      ) : null}
    </div>
  );
}

function RelatedSentence({ sentences }) {
  return (
    <div className="RelatedSentence">
      <div className="SentenceBoard">
        <div className="LightBall">
          <img src="/image/LightBall.png" width="40px" />
          <Text24 text="단어가 들어간 문장으로도 발음해봐요" />
        </div>
        <div className="SentenceList">
          {sentences.map((sentence, i) => {
            return <SentenceItem sentence={sentence} key={i} />;
          })}
        </div>
        <div className="SpeakingGirl">
          <img src="/image/SpeakingGirl.png" width="100%" />
        </div>
      </div>
    </div>
  );
}

export default SentenceButton;
