import { useEffect, useState } from "react";
import Ch5PronunciationLeft from "../../molecules/StudyList/Ch5PronunciationLeft";
import Ch5PronunciationRight from "../../molecules/StudyList/Ch5PronunciationRight";
import baseApi from "../../api/fetchAPI";
import { useParams } from "react-router-dom";

const Ch5Pronunciation = ({saying, realData, location, onCharacterClick}) => {

  const params = useParams()
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
    <div className="">
      <div className="d-flex">
        <div className="">
          <Ch5PronunciationLeft data={"발음"} />
        </div>
        {word ? (
          <div>
            <Ch5PronunciationRight data={word} location={location} onCharacterClick={onCharacterClick} />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="d-flex" style={{ marginTop: 30 }}>
        <div>
          <Ch5PronunciationLeft data={"내 발음"} />
        </div>
        {pronounce ? (
          <div>
            <Ch5PronunciationRight data={realData} location={[]} onCharacterClick={onCharacterClick}/>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Ch5Pronunciation;
