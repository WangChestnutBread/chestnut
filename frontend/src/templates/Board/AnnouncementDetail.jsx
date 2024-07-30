import NavBar from "../../organisms/NavBar";
import QnaDetail from "../../organisms/Board/QnaDetail";
import "./AnnouncementDetail.css";
import LogoAnnouncement from "../../molecules/Board/LogoAnnouncement";
import QnaAnswer from "../../organisms/Board/QnaAnswer";

const AnnouncementDetail = () => {
  return (
    <div>
      {/* 헤더 */}
      <NavBar />
      <div className="container text-start">
        {/* 로고 */}
        <LogoAnnouncement />
        {/* Qna 내용 */}
        <QnaDetail />
        {/* answer 내용 */}
        <QnaAnswer />
        {/* 삭제 수정 버튼 */}
          <div className="row justify-content-evenly">
            <button className="deletebtn">삭제</button>
            <button className="updatebtn">수정</button>
          </div>
        </div>
      </div>
  );
};

export default AnnouncementDetail;
