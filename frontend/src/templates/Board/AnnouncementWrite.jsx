import NavBar from "../../organisms/NavBar";
import QnaDetail from "../../organisms/Board/QnaDetail";
import { NavLink, useNavigate } from "react-router-dom";
import "./QnaDetailTemplate.css";
import LogoAnnouncement from "../../molecules/Board/LogoAnnouncement";
import QnaAnswer from "../../organisms/Board/QnaAnswer";
import ListBtn from "../../molecules/Board/ListBtn";
import StudyBackButton from "../../molecules/StudyBackButton";
import ChestNutButton from "../../organisms/ChestNutButton";


const AnnouncementWrite = () => {
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
      <div className="container text-start">
        {/* 로고 */}
        <LogoAnnouncement />
        {/* Qna 내용 */}
        <QnaDetail />
        {/* answer 내용 */}
        <QnaAnswer />
        {/* 목록 버튼 */}
        <ListBtn />
        <hr className="mt-5"/>
      </div>
    </div>
  )
}
export default AnnouncementWrite