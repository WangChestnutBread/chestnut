import "./SoundMethod.css";
import HowSpeak from "../../molecules/StudyList/HowSpeak";
import SpeakExplanation from "../../molecules/StudyList/SpeakExplanation";
import { useEffect, useState } from "react";
import baseApi from "../../api/fetchAPI";

const Ch5SM = ({ hangeul, selectedChar }) => {
  const [explanation, setExplanation] = useState("");
  console.log(selectedChar);
  function getConstantVowel(kor) {
    const f = [
      "ㄱ",
      "ㄲ",
      "ㄴ",
      "ㄷ",
      "ㄸ",
      "ㄹ",
      "ㅁ",
      "ㅂ",
      "ㅃ",
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅉ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
    ];
    const s = [
      "ㅏ",
      "ㅐ",
      "ㅑ",
      "ㅒ",
      "ㅓ",
      "ㅔ",
      "ㅕ",
      "ㅖ",
      "ㅗ",
      "ㅘ",
      "ㅙ",
      "ㅚ",
      "ㅛ",
      "ㅜ",
      "ㅝ",
      "ㅞ",
      "ㅟ",
      "ㅠ",
      "ㅡ",
      "ㅢ",
      "ㅣ",
    ];
    const t = [
      "",
      "ㄱ",
      "ㄲ",
      "ㄳ",
      "ㄴ",
      "ㄵ",
      "ㄶ",
      "ㄷ",
      "ㄹ",
      "ㄺ",
      "ㄻ",
      "ㄼ",
      "ㄽ",
      "ㄾ",
      "ㄿ",
      "ㅀ",
      "ㅁ",
      "ㅂ",
      "ㅄ",
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
    ];
    const ga = 44032;
    let uni = kor.charCodeAt(0);

    uni = uni - ga;

    let fn = parseInt(uni / 588);
    let sn = parseInt((uni - fn * 588) / 28);
    let tn = parseInt(uni % 28);

    return {
      f: f[fn],
      s: s[sn],
      t: t[tn],
    };
  }
  const [word, setWord] = useState("");

  const a = getConstantVowel(selectedChar);
  console.log(a.f);
  useEffect(() => {
    if (!a.t) {
      baseApi
        .get(`/study/detail/pronunciation`, {
          params: {
            initial: `${a.f}`,
            middle: `${a.s}`,
          },
        })
        .then((res) => {
          console.log(res);
          setWord(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
       baseApi
        .get(`/study/detail/pronunciation`, {
          params: {
            initial: `${a.f}`,
            middle: `${a.s}`,
            last: `${a.t}`,
          },
        })
        .then((res) => {
          console.log(res);
          setWord(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedChar]);
  console.log(word);
  return (
    <div className="ch2 rounded-3 shadow">
      <HowSpeak />
      {word ? (
        <SpeakExplanation data={word} />
      ) : (
        <p>글자를 클릭하여 설명을 확인하세요</p>
      )}
    </div>
  );
};

export default Ch5SM;
