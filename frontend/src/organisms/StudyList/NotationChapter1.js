// NotationChapter1.js

import { useParams } from "react-router-dom";
import "./NotationChapter1.css";

const data = {
  code: 200,
  data: [
    {
      word: "ㄱ",
      pronounce: "ㄱ",
    },
    {
      word: "ㄲ",
      pronounce: "ㄲ",
    },
    {
      word: "ㄴ",
      pronounce: "ㄴ",
    },
    {
      word: "ㄷ",
      pronounce: "ㄷ",
    },
    {
      word: "ㄸ",
      pronounce: "ㄸ",
    },
    {
      word: "ㄹ",
      pronounce: "ㄹ",
    },
    {
      word: "ㅁ",
      pronounce: "ㅁ",
    },
    {
      word: "ㅂ",
      pronounce: "ㅂ",
    },
    {
      word: "ㅃ",
      pronounce: "ㅃ",
    },
    {
      word: "ㅅ",
      pronounce: "ㅅ",
    },
    {
      word: "ㅆ",
      pronounce: "ㅆ",
    },
    // {
    //   word: "ㅇ",
    //   pronounce: "ㅇ",
    // },
    {
      word: "ㅈ",
      pronounce: "ㅈ",
    },
    {
      word: "ㅉ",
      pronounce: "ㅉ",
    },
    {
      word: "ㅊ",
      pronounce: "ㅊ",
    },
    {
      word: "ㅋ",
      pronounce: "ㅋ",
    },
    {
      word: "ㅌ",
      pronounce: "ㅌ",
    },
    {
      word: "ㅍ",
      pronounce: "ㅍ",
    },
    {
      word: "ㅎ",
      pronounce: "ㅎ",
    },
    {
      word: "ㅏ",
      pronounce: "ㅏ",
    },
    {
      word: "ㅐ",
      pronounce: "ㅐ",
    },
    {
      word: "ㅑ",
      pronounce: "ㅑ",
    },
    {
      word: "ㅒ",
      pronounce: "ㅒ",
    },
    {
      word: "ㅓ",
      pronounce: "ㅓ",
    },
    {
      word: "ㅔ",
      pronounce: "ㅔ",
    },
    {
      word: "ㅕ",
      pronounce: "ㅕ",
    },
    {
      word: "ㅖ",
      pronounce: "ㅖ",
    },
    {
      word: "ㅗ",
      pronounce: "ㅗ",
    },
    {
      word: "ㅘ",
      pronounce: "ㅘ",
    },
    {
      word: "ㅙ",
      pronounce: "ㅙ",
    },
    {
      word: "ㅚ",
      pronounce: "ㅚ",
    },
    {
      word: "ㅛ",
      pronounce: "ㅛ",
    },
    {
      word: "ㅜ",
      pronounce: "ㅜ",
    },
    {
      word: "ㅝ",
      pronounce: "ㅝ",
    },
    {
      word: "ㅞ",
      pronounce: "ㅞ",
    },
    {
      word: "ㅟ",
      pronounce: "ㅟ",
    },
    {
      word: "ㅠ",
      pronounce: "ㅠ",
    },
    {
      word: "ㅡ",
      pronounce: "ㅡ",
    },
    {
      word: "ㅢ",
      pronounce: "ㅢ",
    },
    {
      word: "ㅣ",
      pronounce: "ㅣ",
    },
  ],
};

const NotationChapter1 = (word) => {
  // console.log(word);

  return (
    <div className="box">
      <div className="abc">표기[발음]</div>
      <div className="data1">{word.word}</div>
      <div className="data2">{`[${word.word}]`}</div>
    </div>
  );
};

export default NotationChapter1;
