import NavBar from "../../organisms/NavBar";
import QnaDetail from "../../organisms/Board/QnaDetail";
import "./QnaDetailTemplate.css";
import LogoQna from "../../molecules/Board/LogoQna";
import QnaAnswer from "../../organisms/Board/QnaAnswer";
import ListBtn from "../../molecules/Board/ListBtn";
import StudyBackButton from "../../molecules/StudyBackButton";
import ChestNutButton from "../../organisms/ChestNutButton";




const QnaDetailTemplate = () => {
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
        <LogoQna />
        {/* Qna 내용 */}
        <QnaDetail />
        {/* answer 내용 */}
        <QnaAnswer />
        {/* 목록 버튼 */}
        <ListBtn />
        <hr className="mt-5"/>
      </div>
    </div>
  );
};

export default QnaDetailTemplate;

