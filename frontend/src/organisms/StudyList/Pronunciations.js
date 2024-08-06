import { useEffect, useState } from "react";
import PronunciationLeft from "../../molecules/StudyList/PronunciationLeft";
import PronunciationRight from "../../molecules/StudyList/PronunciationRight";
import baseApi from "../../api/fetchAPI";

const Pronunciations = (saying) => {
  // console.log(saying);
  // console.log(123123);
  const [word, setWrod] = useState("");
  const [pronounce, setPronounce] = useState("");
  // const mokData1 = {
  //   data: "[가]",
  //   }
  // const mokData2 = {
  //   data: data
  // }
  useEffect(() => {
    baseApi.get(`/study/detail/${saying.saying.studyId}/word`).then((res) => {
      console.log(res);
      setWrod(res.data.data.word);
      setPronounce(res.data.data.pronounce);
    });
  });

  console.log(word);
  console.log(pronounce);

  return (
    <div>
      <div className="d-flex">
        <div>
          <PronunciationLeft data={"발음"} />
        </div>
        {word ? (
          <div>
            <PronunciationRight data={word} />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="d-flex" style={{ marginTop: 30 }}>
        <div>
          <PronunciationLeft data={"내 발음"} />
        </div>
        {pronounce ? (
          <div>
            <PronunciationRight data={pronounce} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Pronunciations;
