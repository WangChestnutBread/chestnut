import MouseTongue from "../../organisms/StudyList/MouseTongue";
import "../NavbarExample.css";
import Notation from "../../organisms/StudyList/NotationChapter1";
import CameraOrganism from "../../organisms/StudyList/CameraOrganism";
import {useParams} from "react-router-dom";
import {useState} from "react";
import baseApi from "../../api/fetchAPI";
import NavbarExample from "../NavbarExample";
import SMCH1 from "./../../organisms/StudyList/SMCH1";
import CH1record from "./../../organisms/StudyList/CH1record";
import "./ChapterDetail.css"
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
    <div class="ChapterDetail">
      {/* 헤더 */}
      <NavbarExample />
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
        <div className="d-flex justify-content-between" style={{gap:"20px"}}>
          <div className="flex-grow-1 justify-content-center">
            <div>
              <SMCH1 hangeul={params} />
            </div>
            <div className="mt-2 me-4 d-flex justify-content-center">
              <CH1record func={moveData} func2={answer} />
            </div>
          </div>
          <div className="">
            <CameraOrganism />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chapter1Detail;
