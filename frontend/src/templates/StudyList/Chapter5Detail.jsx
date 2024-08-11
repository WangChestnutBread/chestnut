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
import Pronunciation from "../../organisms/StudyList/Pronunciations"
import { useParams } from "react-router-dom";
import { useState } from "react";
import baseApi from "../../api/fetchAPI";

const Chapter5Detail = () => {
  const params = useParams()
  const [realData, setRealData] = useState("내발음😎")
  const [answerData, setAnswerData] = useState([100000])
  const [show, isShow] = useState(false)

  const moveData = (value) => {
    setRealData(value)
  }
  const answer = (value) => {
    setAnswerData(value)
    console.log(value);
    if (value.length === 0) {
      isShow(true)
      baseApi.get('/log/study',{
        params:{
          studyId: params.studyId,
          isPass: 1
        }
      }).then((res) => {
        console.log(res);
        alert('축하드려요 성공입니다.')
      })
    }
  }
 

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
      {/* 표기, 카메라 */}
      <div className="container">
        <div className="row">
          <div className="col-6 mt-2">
            <Notation word={params} realData={realData}/>
          </div>
          <div className="col-6 mt-2">
            <CameraOrganism />
          </div>
        </div>
        {/* 소리나는 방법, ???(우승다람쥐) */}
        <div className="row">
          <div className="col-6 mt-2" >
            <Pronunciation saying={params} realData={realData} location={answerData}/>
          </div>
          <div className="col-6 mt-2 mb-3">
            
          </div>
        </div>
        {/* 마이크 */}
        <RecordData func={moveData} func2={answer}/>
      </div>
    </div>
  );
};
export default Chapter5Detail;
