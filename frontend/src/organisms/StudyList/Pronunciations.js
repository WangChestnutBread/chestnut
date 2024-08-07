import { useEffect, useState } from "react";
import PronunciationLeft from "../../molecules/StudyList/PronunciationLeft";
import PronunciationRight from "../../molecules/StudyList/PronunciationRight";
import baseApi from "../../api/fetchAPI";
import useAuthStore from "../../stores/authStore";

const Pronunciations = ({saying, realData}) => {

  console.log(realData);
  const [word, setWrod] = useState("")
  const [pronounce, setPronounce] = useState("")

  

  useEffect(() => {
    baseApi.get(`/study/detail/${saying.studyId}/word`).then((res) => {
      console.log(res);
      setWrod(res.data.data.word);
      setPronounce(res.data.data.pronounce);
    });
  });

  // console.log(word);
  // console.log(pronounce);

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
            <PronunciationRight data={realData} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Pronunciations;
