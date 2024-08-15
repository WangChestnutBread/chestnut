import "../NavbarExample.css";
import StudyBackButton from "../../molecules/StudyBackButton";
import ChestNutButton from "../../organisms/ChestNutButton";
import NavbarExample from "../NavbarExample";
import Notation from "../../organisms/StudyList/NotationChapter1";
import CameraOrganism from "../../organisms/StudyList/CameraOrganism";
import RecordData from "../../organisms/StudyList/Record";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
  const [answerData, setAnswerData] = useState([100000,15656,1561568,156186,15615615,156,156,156,456,456,99,999,999,999,99,999,1000,9999,99999,99999,9999,999,99999,99999,99999,9999]);
  const [show, isShow] = useState(false);
  const [selectedChar, setSelectedChar] = useState("");
  const [correct, isCorrect] = useState(false);
  const [wrong, isWrong] = useState(false);
  const [isVocabulary, setIsVocabulary] = useState(null)

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
        })
  },[])
  
  const moveData = (value) => {
    setRealData(value);
  };

  useEffect(() => {
    setAnswerData([100000,15656,1561568,156186,15615615,156,156,156,456,456,99,999,999,999,99,999,1000,9999,99999,99999,9999,999,99999,99999,99999,9999])
  },[])

  const answer = (value) => {
    setAnswerData(value);
    if (value.length === 0) {
      isShow(true);
      baseApi
        .get("/log/study", {
          params: {
            studyId: params.studyId,
            isPass: 1,
          }
          
        })
        .then((res) => {
          isCorrect(true);
          setTimeout(() => {
            isCorrect(false);
          }, 2000);
        })
        .catch((err) => {
         
        });
    }
  
  };

  const handleIsVocabulary = (isVocabulary) => {
    setIsVocabulary(isVocabulary)
  }
  

  return (
    <div>
      <NavbarExample showBookMarkButton={true} studyId={params.studyId} {...(isVocabulary !== null ? { isVocabulary } : {})}/>

    
      {/* 행과 열로 나눔. Style 위주로 함. 
      marginTop으로 행 사이 margin을 주고
      1행 사이에 marginLeft와 marginRight로 열 간 간격을 줌*/}

      <div className="container">
        {/* 표기, 카메라 */}

        {/* 1행 */}
        <div 
          style={{
            display:"flex",
            justifyContent:"space-evenly",
            marginTop:"25px",
        }}>
          {/* 1행 1열 */}
          <div 
            style={{
              maxWidth:"30%",
          }}>
            {/* <Notation word={params} /> */}
            <Ch3Notation word={params} />
          </div>
          {/* 1행 2열: 소리나는 방법, 카메라 */}
          <div 
            style={{
              maxWidth:"40%",
              marginLeft:"20px",              
          }}>
            <CameraOrganism />
          </div>
          {/* 1행 3열: 발음과 내 발음 */}
          <div 
            style={{
              width:"30%",
              marginLeft:"20px", 
          }}>
            <Ch5Pronunciation
              saying={params}
              realData={realData}
              location={answerData}
              onCharacterClick={setSelectedChar}
              handleIsVocabulary={handleIsVocabulary}
            />
          </div>
        </div>
        
        {/* 2행 */}
        <div 
          style={{
            maxHeight:"30%",
            marginTop:"25px",
        }}>
          <Ch5SM hangeul={params} selectedChar={selectedChar} />
        </div>
        {/* 3행: 네비게이션 바 */}
        <div 
          style={{
            marginTop:"25px",
        }}>
        <RecordData func={moveData} func2={answer} />
        </div>

        {/* 별개 */}
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

      </div>
    </div>


    // <div>




    //   <div className="container">
    //     <div className="row">
    //       <div className="col-8 mt-2">
    //         <div className="d-flex">
    //           <div className="col-3">

    //           </div>
    //           <div className="col-6">
    
    //           </div>
    //           <div className="col-3">

    //           </div>
    //         </div>

    //         <div className="mt-2 justify-content-center">
              
    //         </div>
    //         <div className="mt-2">

    //         </div>
    //       </div>
    //       <div className="col-4 mt-2">
            
    //       </div>
    //     </div>
        
    //     <div className="row">
    //       <div className="col-6 mt-2 mb-3"></div>
    //     </div>
        
    //     {/* 마이크 */}
    //   </div>
    // </div>
  );
};
export default Chapter6Detail;
