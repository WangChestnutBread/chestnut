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
import { useState } from "react";
import { useParams } from "react-router-dom";

const Chapter1Detail = () => {
  const params = useParams()
  
  // console.log(word);

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
            <Notation  word={params}/>
          </div>
          <div className="col-8">
            <MouseTongue />
          </div>
        </div>
        {/* 소리나는 방법, 카메라 */}
        <div className="row">
          <div className="col-6">
            <SoundMethod hangeul={params}/>
          </div>
          <div className="col-6">
            <CameraOrganism />
          </div>
        </div>
        {/* 마이크 */}
        <RecordData />
      </div>
    </div>
  );
};
export default Chapter1Detail;
