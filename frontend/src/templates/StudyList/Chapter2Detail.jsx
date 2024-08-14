import "../NavbarExample.css";
import NavbarExample from "../NavbarExample";
import Notation from "../../organisms/StudyList/NotationChapter1";
import SoundMethod from "../../organisms/StudyList/SoundMethod";
import CameraOrganism from "../../organisms/StudyList/CameraOrganism";
import RecordData from "../../organisms/StudyList/Record";
import Pronunciation from "../../organisms/StudyList/Pronunciations";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import baseApi from "../../api/fetchAPI";
import Ch2Notation from "./../../organisms/StudyList/Ch2Notation";
import Lottie from "lottie-react";
import Correct from "../../assets/lottie/correct.json";
import Wrong from "../../assets/lottie/wrong.json"

const Chapter2Detail = () => {
  const params = useParams();
  console.log(params);
  const [realData, setRealData] = useState("녹음된 발음");
  const [answerData, setAnswerData] = useState([100000]);
  const [show, isShow] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [yes, setYes] = useState(false)
  const [no, setNo] = useState(false)


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
          console.log(res);
          setCorrect(true);
          setYes(true)
          setTimeout(() => {
            setYes(false)
          },2000)
        }).catch((err) => {
          setNo(true)
          setTimeout(() => {
            setNo(false)
          },2000)
        })
    }
  };

  return (
    <div>
      {/* 헤더 */}
      <NavbarExample showBookMarkButton={true}/>
      {/* 표기, 소리나는 방법*/}
      <div className="container">
        <div className="row">
          <div className="col-4 mt-2">
            <Ch2Notation word={params} />
            {/* <Notation word={params}/> */}
          </div>
          <div className="col-8 mt-2">
            <SoundMethod hangeul={params} />
          </div>
        </div>
        {/* 발음, 카메라 */}
        <div className="row">
          <div className="col-6 mt-2 ">
            <Pronunciation
              saying={params}
              realData={realData}
              location={answerData}
            />
            <div className="mt-5 d-flex ms-5">
              <RecordData func={moveData} func2={answer} />
              <div style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  zIndex: 1000,
                  width: "800px",
                  height: "800px",
                  transform: "translate(-50%, -50%)", // 화면 중앙에 위치시키기 위해
                  pointerEvents: "none", // 이 요소는 클릭을 무시하도록 설정
                }}>
                {yes ? <Lottie animationData={Correct} /> : <></>}
              </div>
              <div style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  zIndex: 1000,
                  width: "800px",
                  height: "800px",
                  transform: "translate(-50%, -50%)", // 화면 중앙에 위치시키기 위해
                  pointerEvents: "none", // 이 요소는 클릭을 무시하도록 설정
                }}>
                  {no ? <Lottie animationData={Wrong} /> : <></>}
                </div>
            </div>
          </div>

          <div className="col-6 mt-2 mb-3">
            <CameraOrganism />
          </div>
        </div>
        {/* 마이크 */}
      </div>
    </div>
  );
};
export default Chapter2Detail;
