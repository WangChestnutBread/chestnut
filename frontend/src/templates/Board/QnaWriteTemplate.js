import NavBar from "../../organisms/NavBar";
import "./QnaWriteTemplate.css";
import { useNavigate } from "react-router-dom";

const QNAWritePage = () => {
  const navigate = useNavigate()
  const handleQnaClick = () => {
    navigate('/board/qna')
  }
  const handleDetailClick = () => {
    navigate('/board/qna')
  }

  return (
    <div>
      {/* // 헤더 영역 */}
      <NavBar/>
      <div className="container text-start justify-center">
        {/* // 메인타이틀 QNA */}
        <div className="logo-container">
          <div className="position-relative">
            <img src="/image/Logo.png" alt="밤빵" className="logo" />
            <span className="qna position-absolute bottom-0 start-100">
              Q&A
            </span>
          </div>
        </div>
        {/* // 공지 유형 */}
        <div>
          <p className="p-3 fs-5">공지유형</p>
          <select
            className="form-select rounded-3 selected fs-5"
            aria-label="Default select example"
          >
            <option selected>유형을 선택하시오</option>
            <option value="1">유형1</option>
            <option value="2">유형2</option>
            <option value="3">유형3</option>
            <option value="4">유형4</option>
            <option value="5">유형5</option>
            <option value="6">유형6</option>
            <option value="7">유형7</option>
          </select>
        </div>

        {/* //제목 */}
        <p className="p-3 fs-5">제목</p>
        <div class="input-group mb-3">
          <input
            type="text"
            className="form-control rounded-3 text fs-5"
            placeholder="제목을 입력하시오"
          />
        </div>
        {/* //내용 */}
        <p className="p-3 fs-5">내용</p>
        <div class="form-floating">
          <textarea
            className="form-control rounded-3 content fs-5"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
          ></textarea>
          <label for="floatingTextarea2">Comments</label>
        </div>

        {/* // 취소 등록 버튼 */}
        <div className="d-flex justify-content-between">
          <button className="nobtn fs-3" onClick={handleQnaClick}>취소</button>
          <button className="yesbtn fs-3" onClick={handleDetailClick}>등록</button>
        </div>
      </div>
    </div>
  );
};

export default QNAWritePage;
