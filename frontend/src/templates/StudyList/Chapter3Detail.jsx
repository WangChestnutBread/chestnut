import NavBar from "../../organisms/NavBar";
import MouseTongue from "../../organisms/StudyList/MouseTongue";
import Record from "../../organisms/StudyList/Record";
import "../NavbarExample.css";
import NavbarExample from "../NavbarExample";
import Notation from "../../organisms/StudyList/NotationChapter1";
import SoundMethod from "../../organisms/StudyList/SoundMethod";
import CameraOrganism from "../../organisms/StudyList/CameraOrganism";
import RecordData from "../../organisms/StudyList/Record";
import Pronunciation from "../../organisms/StudyList/Pronunciations";
import { useParams } from "react-router-dom";
import { useState } from "react";
import baseApi from "../../api/fetchAPI";
import Ch3SM from "../../organisms/StudyList/Ch3SM";
import Ch3Notation from "./../../organisms/StudyList/Ch3Notaion";
import Lottie from "lottie-react";
import Correct from "../../assets/lottie/correct.json";
import Wrong from "../../assets/lottie/wrong.json";
import "./ChapterDetail.css";

const Chapter3Detail = () => {
  const params = useParams();
  const [realData, setRealData] = useState("녹음된 발음");
  const [answerData, setAnswerData] = useState([100000]);
  const [show, isShow] = useState(false);
  const [correct, isCorrect] = useState(false);
  const [wrong, isWrong] = useState(false);
  const [isVocabulary, setIsVocabulary] = useState(null)

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
          isCorrect(true);
          setTimeout(() => {
            isCorrect(false);
          }, 2000);
        })
        
    }
  };

  const handleIsVocabulary = (isVocabulary) => {
    setIsVocabulary(isVocabulary)
  }

  return (
    <div className="ChapterDetail">
      {/* 헤더 */}
      <NavbarExample showBookMarkButton={true} studyId={params.studyId} {...(isVocabulary !== null ? { isVocabulary } : {})}></NavbarExample>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <div className="d-flex">
              <div className="col-5" style={{height:'341px'}}>
                {/* <Notation word={params} /> */}
                <Ch3Notation word={params} />
              </div>
              <div className="col-7" style={{marginLeft:"5px"}}>
                <CameraOrganism />
              </div>
            </div>

            <div className="mt-2 justify-content-center" 
              style={{
                height:"250px",
            }}>
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
                {correct ? <Lottie animationData={Correct} /> : <></>}
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
                   {wrong ? <Lottie animationData={Wrong} /> : <></>}
              </div>
            </div>
          </div>
          <div className="col-4 mt-2">
            <Ch3SM hangeul={params} />
          </div>
        </div>
        {/* 소리나는 방법, 카메라 */}
        <RecordData func={moveData} func2={answer} />
        {/* 마이크 */}
      </div>
      {/* <div className="container">
      <div 
        style={{
          width:"100%",
          height:"100%",
          display:"flex",
          flexDirection:"column",
      }}>

        <div 
          style={{
            display:"flex",
            width:"100%",
        }}>

          <div 
            style={{
              display:"flex",
              flexDirection:"column",
              width:"70%",
              height:"30%",
          }}>
            <div 
              style={{
                display:"flex",
                height:"100%",
            }}>
              <div style={{
                width:"50%",
              }}>
                <Ch3Notation word={params} />

              </div>
              <div style={{
                width:"50%", 
              }}>
                <CameraOrganism />
              </div>
            </div>
            <div 
              style={{
                display: "flex",
                width: "30%",
              }}
            >
              <Ch3SM hangeul={params} />
            </div>
          </div>
          <div 
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          > <div style={{marginTop:"10px"}}>
            <RecordData func={moveData} func2={answer} />
            </div>
          </div>
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
              {wrong ? <Lottie animationData={Wrong} /> : <></>}
        </div>
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
              {wrong ? <Lottie animationData={Wrong} /> : <></>}
        </div>
      </div>
      </div> */}
    </div>

  );
};
export default Chapter3Detail;
