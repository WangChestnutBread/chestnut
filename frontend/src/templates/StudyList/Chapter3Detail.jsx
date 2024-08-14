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
import Pronunciation from "../../organisms/StudyList/Pronunciations";
import { useParams } from "react-router-dom";
import { useState } from "react";
import baseApi from "../../api/fetchAPI";
import Ch3SM from "../../organisms/StudyList/Ch3SM";
import Ch3Notation from './../../organisms/StudyList/Ch3Notaion';

const Chapter3Detail = () => {
  const params = useParams();
  const [realData, setRealData] = useState("내발음😎");
  const [answerData, setAnswerData] = useState([100000]);
  const [show, isShow] = useState(false);

  const moveData = (value) => {
    console.log(value);
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
          alert("축하드려요 성공입니다.");
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
              <Pronunciation
                saying={params}
                realData={realData}
                location={answerData}
              />
            </div>
            <div className="mt-2">
              <RecordData func={moveData} func2={answer} />
            </div>
          </div>
          <div className="col-4 mt-2">
            <Ch3SM hangeul={params} />
          </div>
        </div>
        {/* 소리나는 방법, 카메라 */}
        <div className="row">
          <div className="col-6 mt-2 mb-3"></div>
        </div>
        {/* 마이크 */}
      </div>
    </div>
  );
};
export default Chapter3Detail;
