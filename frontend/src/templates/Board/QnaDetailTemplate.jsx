import NavBar from "../../organisms/NavBar";
import QnaDetail from "../../organisms/Board/QnaDetail";
import { NavLink, useNavigate } from "react-router-dom";
import "./QnaDetailTemplate.css";
import LogoQna from "../../molecules/Board/LogoQna";
import QnaAnswer from "../../organisms/Board/QnaAnswer";
import ListBtn from "../../molecules/Board/ListBtn";

// const announcement = {
//   qnaCategory: "(랭킹)",
//   title: "랭킹 시스템 문의",
//   content: "랭킹시스템 방식에 대해서 문의 합니다.",
//   created_at: "2024.05.27",
//   name: "김시현",
// };

// const answer = {
//   answer: "답변 내용은 이러합니다.",
//   answer_at: "2024.05.27",
//   name: "관리자",
// };


const QnaDetailTemplate = () => {
  return (
    <div>
      {/* 헤더 */}
      <NavBar />
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

