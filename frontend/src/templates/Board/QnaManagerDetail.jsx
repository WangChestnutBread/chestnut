import NavBar from "../../organisms/NavBar";
import LogoQna from "../../molecules/Board/LogoQna";
import QnaDetail from "../../organisms/Board/QnaDetail";
import ListBtn from "../../molecules/Board/ListBtn";
import './QnaManagerDetail.css'


const QnaManagerDetail = () => {
  return (
    <div>
      {/* 헤더 */}
      <NavBar />
      <div className="container text-start">
        {/* 로고 */}
        <LogoQna />
        {/* 질문 디테일 */}
        <QnaDetail />
        {/* 답변 창 */}
        <div className="answer p-4 mb-4 mt-5 border-bottom border-2 border-black">
          <div className="d-flex justify-content-between mb-3">
              <p className="mt-3">답변을 작성해주세요.</p>
              <button className="answerbtn mt-1">답변 작성</button>
          </div>
        </div>
        {/* 버튼 */}
        <ListBtn />
        <hr  className="mt-5"/>
      </div>
    </div>
  );
};

export default QnaManagerDetail;
