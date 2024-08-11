import { useEffect, useState } from "react";
import PronunciationLeft from "../../molecules/StudyList/PronunciationLeft";
import PronunciationRight from "../../molecules/StudyList/PronunciationRight";
import baseApi from "../../api/fetchAPI";

const Pronunciations = ({saying, realData, location}) => {

  console.log(location);
  console.log(saying);
  const [word, setWrod] = useState("")
  const [pronounce, setPronounce] = useState("")

  useEffect(() => {
    baseApi.get(`/study/detail/${saying.studyId}/word`).then((res) => {
      console.log(res);
      setWrod(res.data.data.word);
      setPronounce(res.data.data.pronounce);
    });
  });


  return (
    <div>
      <div className="d-flex">
        <div>
          <PronunciationLeft data={"발음"} />
        </div>
        {word ? (
          <div>
            <PronunciationRight data={word} location={location} />
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
            <PronunciationRight data={realData} location={[]}/>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Pronunciations;
