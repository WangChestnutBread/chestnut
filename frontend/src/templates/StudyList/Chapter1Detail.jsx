import MouseTongue from "../../organisms/StudyList/MouseTongue";
import "../NavbarExample.css";
import Notation from "../../organisms/StudyList/NotationChapter1";
import CameraOrganism from "../../organisms/StudyList/CameraOrganism";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import baseApi from "../../api/fetchAPI";
import NavbarExample from "../NavbarExample";
import SMCH1 from "./../../organisms/StudyList/SMCH1";
import CH1record from "./../../organisms/StudyList/CH1record";
import "./ChapterDetail.css";
import SideButtonWithModal from "../../organisms/SideButtonWithModal";
import Tutorial from "../../atoms/Tutorial";
import Chapter1StudyTutorial from "../../data/Chapter1StudyTutorial";

const Chapter1Detail = () => {
  const params = useParams();
  const [realData, setRealData] = useState("내발음😎");
  const [answerData, setAnswerData] = useState([100000]);
  const [show, isShow] = useState(false);

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
    console.log(value);
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
        });
    }
  };

  let [showOpenChat, setShowOpenChat] = useState(false);
  let [startTutorial, setStartTutorial] = useState(false);

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

  return (
    <div class="ChapterDetail">
      {/* 헤더 */}
      <NavbarExample />

      {/* 튜토리얼 */}
      <Tutorial steps={Chapter1StudyTutorial} startTutorial={startTutorial} />

      {/* 표기, 입모양, 혀모양 */}
      <div className="container">
        <div className="row mb-2">
          <div className="col-4 mt-2 ">
            <Notation word={params} />
          </div>
          <div className="col-8">
            <MouseTongue params={params} />
          </div>
        </div>
        {/* 소리나는 방법, 카메라 */}
        <div className="d-flex justify-content-between" style={{ gap: "20px" }}>
          <div className="flex-grow-1 justify-content-center">
            <div className="SMCH1">
              <SMCH1 hangeul={params} />
            </div>
            <div className="mt-2 me-4 d-flex justify-content-center">
              <CH1record func={moveData} func2={answer} />
            </div>
          </div>
          <div className="video">
            <CameraOrganism />
          </div>
          <SideButtonWithModal
            showOpenChat={showOpenChat}
            handleOpenChatClick={handleOpenChatClick}
            restartTutorial={restartTutorial}
          />
        </div>
      </div>
    </div>
  );
};
export default Chapter1Detail;
