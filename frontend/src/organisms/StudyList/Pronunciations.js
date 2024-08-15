import { useEffect, useState } from "react";
import PronunciationLeft from "../../molecules/StudyList/PronunciationLeft";
import PronunciationRight from "../../molecules/StudyList/PronunciationRight";
import baseApi from "../../api/fetchAPI";
import { useParams } from "react-router-dom";

const Pronunciations = ({ saying, realData, location, handleIsVocabulary }) => {
  const params = useParams();
  const [word, setWrod] = useState("");
  const [pronounce, setPronounce] = useState("");

  useEffect(() => {
    baseApi.get(`/study/detail/${saying.studyId}/word`).then((res) => {
      console.log(res);
      setWrod(res.data.data.word);
      setPronounce(res.data.data.pronounce);
      handleIsVocabulary(res.data.data.isVocabulary);

    });
  });

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "50%",
        }}
      >
        <div
          style={{
            width: "24%",
            backgroundColor: "#DCB78F",
            display:"flex",
            justifyContent:"center"
          }}
        >
          <PronunciationLeft data={"발음"} />
        </div>
        <div
          style={{
            width: "76%",
            backgroundColor: "lightgray",
            display:"flex",
            justifyContent:"center"
          }}
          className="first"
        >
          {word ? (
            <PronunciationRight data={word} location={location} />
          ) : (
            <></>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "50%",
          marginTop: "2%",
        }}
      >
        <div
          style={{
            width: "24%",
            backgroundColor: "#DCB78F",
            display:"flex",
            justifyContent:"center"
          }}
        >
          <PronunciationLeft data={"내 발음"} />
        </div>
        <div
          style={{
            width: "76%",
            backgroundColor: "lightgray",
            display:"flex",
            justifyContent:"center"
          }}
          className="second"
        >
          {pronounce ? (
            <PronunciationRight data={realData} location={[]} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pronunciations;
