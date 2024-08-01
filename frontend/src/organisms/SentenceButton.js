import "./SentenceButton.css";
import Text24 from "../atoms/Text24";
import SentenceItem from "../molecules/SentenceItem";
import { useState } from "react";

function SentenceButton() {
  let [showSentence, setShowSentence] = useState(false);
  return (
    <div className="SentenceButton">
      <img
        src="/icons/Book.svg"
        width="100%"
        onClick={() => {
          setShowSentence(!showSentence);
        }}
      />
      {
        showSentence ? <RelatedSentence sentences={["철수는 맥도날드에 가서 햄버거를 먹었다"]}/> : null
      }
    </div>
  );
}

function RelatedSentence({ sentences }) {
  return (
    <div className="RelatedSentence">
      <div className="SentenceBoard">
        <div className="LightBall">
          <img src="/image/LightBall.png" width="40px" />
          <Text24 text="단어가 들어간 문장으로도 발음해봐요"/>
        </div>
        <div className="SentenceList">
          {
            sentences.map((sentence, i) => {
            return (
                <SentenceItem sentence={sentence} key={i}/>
            );
          })}
        </div>
        <div className="SpeakingGirl">
            <img src="/image/SpeakingGirl.png" width="100%"/>
        </div>
      </div>
    </div>
  );
}

export default SentenceButton;
