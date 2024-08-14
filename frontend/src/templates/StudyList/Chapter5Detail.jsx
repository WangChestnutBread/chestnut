import { useState } from "react";
import NavbarExample from "../NavbarExample";
import Notation from "../../organisms/StudyList/NotationChapter1";
import CameraOrganism from "../../organisms/StudyList/CameraOrganism";
import RecordData from "../../organisms/StudyList/Record";
import { useParams } from "react-router-dom";
import baseApi from "../../api/fetchAPI";
import Ch5SM from "../../organisms/StudyList/Ch5SM";
import Ch5Pronunciation from "../../organisms/StudyList/Ch5Pronunciation"

const Chapter5Detail = () => {
  const params = useParams();
  const [realData, setRealData] = useState("내발음😎");
  const [answerData, setAnswerData] = useState([100000]);
  const [selectedChar, setSelectedChar] = useState("");  // 클릭된 글자 상태 관리

  const moveData = (value) => {
    setRealData(value);
  };

  const answer = (value) => {
    setAnswerData(value);
    if (value.length === 0) {
      baseApi.get('/log/study',{
        params:{
          studyId: params.studyId,
          isPass: 1
        }
      }).then((res) => {
        alert('축하드려요 성공입니다.');
      });
    }
  };

  return (
    <div>
      {/* 헤더 */}
      <NavbarExample showBookMarkButton={true} showSentenceButton={true}/>
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
            <Ch5Pronunciation 
              saying={params} 
              realData={realData} 
              location={answerData}
              onCharacterClick={setSelectedChar}  // 클릭된 글자를 전달
            />
          </div>
          <div className="col-6 mt-2 mb-3" style={{"width":"500px", 'height': "350px"}} >
            <img src="/image/success.png" alt="practice" style={{"width": "100%", "height":"100%"}} />
          </div>
          <div>
            <Ch5SM hangeul={params} selectedChar={selectedChar}/>  {/* 선택된 글자 전달 */}
          </div>
        </div>
        {/* 마이크 */}
        <div className="mt-5">
        <RecordData func={moveData} func2={answer}/>
        </div>
      </div>
    </div>
  );
};

export default Chapter5Detail;
