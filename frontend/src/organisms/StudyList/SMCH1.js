import { useEffect, useState } from "react";
import baseApi from "../../api/fetchAPI";
import HowSpeak from "../../molecules/StudyList/HowSpeak";
import SpeakExplanation from "../../molecules/StudyList/SpeakExplanation";
import "./SMCH1.css";

const SMCH1 = (hangeul) => {
  const distinction = parseInt(hangeul.hangeul.studyId);
  const [hangeulData, setHangeulData] = useState();


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
  
  // console.log(distinction);

  // const a = getConstantVowel(hangeul.hangeul);
  // console.log(a);z
  const [word, setWord] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      // console.log(hangeul.hangeul.chapterId);
      if (parseInt(hangeul.hangeul.chapterId) === 1) {
        // console.log(distinction);
        // distinction이 19보다 작을 때만 API 호출
        if (distinction < 20) {
          console.log(distinction);
          try {
            // 첫 번째 axios 호출
            const firstResponse = await baseApi.get(`/study/chapter/1`);
            // console.log(firstResponse.data.data[1]);
            const word = firstResponse.data.data[1].child[distinction-1].word
            console.log(word);
            // console.log(word);
            setHangeulData(word);
            // 두 번째 axios 호출
            const pronunciationResponse = await baseApi.get(
              `/study/detail/pronunciation`,
              {
                params: {
                  initial: `${word}`, // 상태 대신 바로 변수 word 사용
                },
              }
            );
            // console.log(pronunciationResponse);
            setWord(pronunciationResponse.data.data);
          } catch (err) {
            console.log(err);
          }
        } else if (distinction > 19) {
          try {
            // 첫 번째 axios 호출
            const firstResponse = await baseApi.get(`/study/chapter/1`);
            const word = firstResponse.data.data[0].child[distinction-20].word
            console.log(word);
            setHangeulData(word);
            // 두 번째 axios 호출
            const pronunciationResponse = await baseApi.get(
              `/study/detail/pronunciation`,
              {
                params: {
                  middle: `${word}`, // 상태 대신 바로 변수 word 사용
                },
              }
            );
            // console.log(pronunciationResponse);
            setWord(pronunciationResponse.data.data);
          } catch (err) {
            console.log(err);
          }
        }
      } 
      else  {

        const response = await baseApi.get(`/study/detail/${distinction}/word`);

        const word = response.data.data.word;
        const a = getConstantVowel(word);
      
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
    };
    fetchData();
  }, [hangeul.hangeul.studyId]);

  return (
    <div className="ch1 rounded-3 shadow ">
      <HowSpeak />
      {word ? <SpeakExplanation data={word} /> : <></>}
    </div>
  );
};
export default SMCH1;
