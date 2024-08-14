import NavBar from "../../organisms/NavBar";
import QnaDetail from "../../organisms/Board/QnaDetail";
import "./QnaDetailTemplate.css";
import LogoQna from "../../molecules/Board/LogoQna";
import QnaAnswer from "../../organisms/Board/QnaAnswer";
import ListBtn from "../../molecules/Board/ListBtn";
import NavbarExample from "../NavbarExample";




const QnaDetailTemplate = () => {
  return (
    <div>
      {/* 헤더 */}
      <NavbarExample/>
      <div className="container text-start">
        {/* 로고 */}
        <LogoQna />
        {/* 목록 버튼 */}
        <ListBtn />
        {/* Qna 내용 */}
        <QnaDetail />
        {/* answer 내용 */}
        <QnaAnswer />
        
      </div>
    </div>
  );
};

export default QnaDetailTemplate;

