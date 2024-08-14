import "../NavbarExample.css";
import StudyBackButton from "../../molecules/StudyBackButton";
import ChestNutButton from "../../organisms/ChestNutButton";
import NavbarExample from "../NavbarExample";
import Notation from "../../organisms/StudyList/NotationChapter1";
import CameraOrganism from "../../organisms/StudyList/CameraOrganism";
import RecordData from "../../organisms/StudyList/Record";
import { useParams } from "react-router-dom";
import { useState } from "react";
import baseApi from "../../api/fetchAPI";
import Ch3Notation from "./../../organisms/StudyList/Ch3Notaion";
import Ch5Pronunciation from "./../../organisms/StudyList/Ch5Pronunciation";
import Ch5SM from "./../../organisms/StudyList/Ch5SM";
import Lottie from "lottie-react";
import Correct from "../../assets/lottie/correct.json";
import Wrong from "../../assets/lottie/wrong.json";

const Chapter6Detail = () => {
  const params = useParams();
  const [realData, setRealData] = useState("녹음된 발음");
  const [answerData, setAnswerData] = useState([100000]);
  const [show, isShow] = useState(false);
  const [selectedChar, setSelectedChar] = useState("");
  const [correct, isCorrect] = useState(false);
  const [wrong, isWrong] = useState(false);

  const moveData = (value) => {
    setRealData(value);
  };

  const answer = (value) => {
    setAnswerData(value);
    if (value.length === 0) {
      isShow(true);
      baseApi
        .get("/log/study", {
          params: {
            studyId: params.studyId,
            isPass: 1,
          },
        })
        .then((res) => {
          isCorrect(true);
          setTimeout(() => {
            isCorrect(false);
          }, 2000);
        })
        .catch((err) => {
          isWrong(true);
          setTimeout(() => {
            isWrong(false);
          }, 2000);
        });
    }
  };

  return (
    <div>
      {/* 헤더 */}
<<<<<<< frontend/src/templates/StudyList/Chapter6Detail.jsx
      <div className="NavbarExample">
        <div className="NavbarButton">
          <div className="LeftButton">
            <StudyBackButton />
            <ChestNutButton />
          </div>
        </div>
      </div>
      {/* 표기, 입모양, 혀모양 */}
=======
      <NavbarExample showBookMarkButton={true}/>
      {/* 표기, 카메라 */}
>>>>>>> frontend/src/templates/StudyList/Chapter6Detail.jsx
      <div className="container">
        <div className="row">
          <div className="col-8 mt-2">
            <div className="d-flex">
              <div className="col-4">
                {/* <Notation word={params} /> */}
                <Ch3Notation word={params} />
              </div>
              <div className="col-8">
                <CameraOrganism />
              </div>
            </div>

            <div className="mt-2 justify-content-center">
              <Ch5Pronunciation
                saying={params}
                realData={realData}
                location={answerData}
                onCharacterClick={setSelectedChar}
              />
            </div>
            <div className="mt-2">
              <RecordData func={moveData} func2={answer} />
            </div>
          </div>
          <div className="col-4 mt-2">
            <Ch5SM hangeul={params} selectedChar={selectedChar} />
          </div>
        </div>
        {/* 소리나는 방법, 카메라 */}
        <div className="row">
          <div className="col-6 mt-2 mb-3"></div>
        </div>
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            zIndex: 1000,
            width: "800px",
            height: "800px",
            transform: "translate(-50%, -50%)", // 화면 중앙에 위치시키기 위해
            pointerEvents: "none", // 이 요소는 클릭을 무시하도록 설정
          }}
        >
          {correct ? <Lottie animationData={Correct} /> : <></>}
        </div>
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            zIndex: 1000,
            width: "800px",
            height: "800px",
            transform: "translate(-50%, -50%)", // 화면 중앙에 위치시키기 위해
            pointerEvents: "none", // 이 요소는 클릭을 무시하도록 설정
          }}
        >
          {wrong ? <Lottie animationData={Wrong} /> : <></>}
        </div>
        {/* 마이크 */}
      </div>
    </div>
  );
};
export default Chapter6Detail;
