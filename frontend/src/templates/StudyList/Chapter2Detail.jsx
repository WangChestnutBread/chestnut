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
import Wrong from "../../assets/lottie/wrong.json";
import "./ChapterDetail.css";
import SideButtonWithModal from "../../organisms/SideButtonWithModal";
import Tutorial from "../../atoms/Tutorial";
import Chapter2StudyTutorial from "../../data/Chapter2StudyTutorial";

const Chapter2Detail = () => {
  const params = useParams();
  console.log(params);
  const [realData, setRealData] = useState("녹음된 발음");
  const [answerData, setAnswerData] = useState([100000]);
  const [show, isShow] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);
  const [wrong, isWrong] = useState(false);
  const [isVocabulary, setIsVocabulary] = useState(null);
  let [showOpenChat, setShowOpenChat] = useState(false);
  let [startTutorial, setStartTutorial] = useState(false);

  // 오픈 채팅 모달 열기
  const handleOpenChatClick = () => {
    setShowOpenChat(!showOpenChat);
  };

  // 튜토리얼 재시작
  const restartTutorial = () => {
    setStartTutorial(false);
    setTimeout(() => {
      setStartTutorial(true);
    }, 0); // 0ms 지연 후 상태를 true로 설정
  };

  useEffect(() => {
    baseApi
      .get("/log/study", {
        params: {
          studyId: params.studyId,
          isPass: 0,
        },
      })
      .then((res) => {
        console.log(res);
      });
  }, []);

  const moveData = (value) => {
    setRealData(value);
  };
  const answer = (isPass, value) => {
    setAnswerData(value);
    if (isPass === 1) {
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
          setYes(true);
          setTimeout(() => {
            setYes(false);
          }, 2000);
        })
        .catch((err) => {
          setNo(true);
          setTimeout(() => {
            setNo(false);
          }, 2000);
        });
    }
  };

  const handleIsVocabulary = (isVocabulary) => {
    setIsVocabulary(isVocabulary);
  };

  return (
    <div className="ChapterDetail">
      {/* 헤더 */}

      <NavbarExample
        showBookMarkButton={true}
        studyId={params.studyId}
        {...(isVocabulary !== null ? { isVocabulary } : {})}
      ></NavbarExample>

      {/* 튜토리얼 */}
      <Tutorial steps={Chapter2StudyTutorial} startTutorial={startTutorial} />

      <div className="container">
        <div className="row">
          <div className="col-8">
            <div className="d-flex">
              <div className="col-5" style={{ height: "341px" }}>
                {/* <Notation word={params} /> */}
                <Ch2Notation word={params} />
              </div>
              <div className="col-7 video2" style={{ marginLeft: "5px" }}>
                <CameraOrganism />
              </div>
            </div>

            <div
              className="mt-2 justify-content-center"
              style={{
                height: "250px",
              }}
            >
              <Pronunciation
                saying={params}
                realData={realData}
                location={answerData}
                handleIsVocabulary={handleIsVocabulary}
              />
            </div>
            <div className="mt-2">
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
                {yes ? <Lottie animationData={Correct} /> : <></>}
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
                {no ? <Lottie animationData={Wrong} /> : <></>}
              </div>
            </div>
          </div>
          <div className="col-4 mt-2">
            <SoundMethod hangeul={params} />
          </div>
        </div>
        {/* 소리나는 방법, 카메라 */}
        <RecordData func={moveData} func2={answer} />
      </div>
      <SideButtonWithModal
        showOpenChat={showOpenChat}
        handleOpenChatClick={handleOpenChatClick}
        restartTutorial={restartTutorial}
      />
    </div>
  );
};
export default Chapter2Detail;
{
  /* <NavbarExample showBookMarkButton={true}/>
      <div className="container">
        <div className="row">
          <div className="col-4 mt-2">
            <Ch2Notation word={params} />
          </div>
          <div className="col-8 mt-2">
            <SoundMethod hangeul={params} />
          </div>
        </div>
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
      </div> */
}
