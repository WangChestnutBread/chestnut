import { useEffect, useState } from "react";
import baseApi from "../../api/fetchAPI";
import HowSpeak from "../../molecules/StudyList/HowSpeak";
import SpeakExplanation from "../../molecules/StudyList/SpeakExplanation";
import "./SoundMethod.css";

const SoundMethod = (hangeul) => {
  console.log(hangeul);
  console.log(hangeul.hangeul);
  // console.log("sadfasdf");
  console.log(hangeul.hangeul.studyId);
  const distinction = parseInt(hangeul.hangeul.studyId);
  // console.log(distinction);

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
  console.log(distinction);

  // const a = getConstantVowel(hangeul.hangeul);
  // console.log(a);z
  const [word, setWord] = useState("");

  useEffect(() => {
    if (distinction > 40) {
      const a = getConstantVowel(hangeul.hangeul.word);
      console.log(a);
      if (a.t) {
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
      } else {
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
      }
    }
    // distinction이 19보다 작을 때만 API 호출
    else if (distinction < 19) {
      baseApi
        .get(`/study/detail/pronunciation`, {
          params: {
            initial: `${hangeul.hangeul.word}`,
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
    else if (distinction > 18) {
      baseApi
        .get(`/study/detail/pronunciation`, {
          params: {
            middle: `${hangeul.hangeul.word}`,
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
  }, []);
  return (
    <div className="qwer rounded-3 shadow ">
      <HowSpeak />
      {word ? <SpeakExplanation data={word} /> : <></>}
    </div>
  );
};
export default SoundMethod;
