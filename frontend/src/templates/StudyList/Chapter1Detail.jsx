import NavBar from "../../organisms/NavBar";
import MouseTongue from "../../organisms/StudyList/MouseTongue";
import Record from "../../organisms/StudyList/Record";
import "../NavbarExample.css";
import StudyBackButton from "../../molecules/StudyBackButton";
import ChestNutButton from "../../organisms/ChestNutButton";
import Notation from "../../organisms/StudyList/NotationChapter1";
import SoundMethod from "../../organisms/StudyList/SoundMethod";
import CameraOrganism from "../../organisms/StudyList/CameraOrganism";
import RecordData from "../../organisms/StudyList/Record";
import { useParams } from "react-router-dom";
import { useState } from "react";
import baseApi from "../../api/fetchAPI";
import SMCH1 from "./../../organisms/StudyList/SMCH1";
import CH1record from "./../../organisms/StudyList/CH1record";

const Chapter1Detail = () => {
  const params = useParams();
  const [realData, setRealData] = useState("내발음😎");
  const [answerData, setAnswerData] = useState([100000]);
  const [show, isShow] = useState(false);

  const moveData = (value) => {
    setRealData(value);
  };
  const answer = (value) => {
    setAnswerData(value);
    console.log(value);
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
        });
    }
  };
  return (
    <div>
      {/* 헤더 */}
      <div className="NavbarExample">
        <div className="NavbarButton">
          <div className="LeftButton">
            <StudyBackButton />
            <ChestNutButton />
          </div>
        </div>
      </div>
      {/* 표기, 입모양, 혀모양 */}
      <div className="container">
        <div className="row">
          <div className="col-4 mt-2 ">
            <Notation word={params} />
          </div>
          <div className="col-8">
            <MouseTongue params={params} />
          </div>
        </div>
        {/* 소리나는 방법, 카메라 */}
        <div className="row d-flex">
          <div className="col-6 justify-content-center">
            <div>
              <SMCH1 hangeul={params} />
            </div>
            <div className="col-6 mt-2 ms-5 d-flex">
              <CH1record func={moveData} func2={answer} />
            </div>
          </div>
          <div className="col-6">
            <CameraOrganism />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chapter1Detail;
