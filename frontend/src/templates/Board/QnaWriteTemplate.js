import { useState } from "react";
import StudyBackButton from "../../molecules/StudyBackButton";
import ChestNutButton from "../../organisms/ChestNutButton";
import "./QnaWriteTemplate.css";
import { useNavigate } from "react-router-dom";
import baseApi from "../../api/fetchAPI";

const QNAWritePage = () => {
  const [qnaCategoryId, setQnaCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();
  const handleQnaClick = () => {
    navigate("/board/qna");
  };

  const handleDetailClick2 = () => {
    baseApi
      .post("/board/qna", {
        qnaCategoryId,
        title,
        content,
      })
      .then((res) => {
        console.log(res);
        navigate("/board/qna");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDetailClick = (e) => {
    if (e.key === "Enter") {
      baseApi
        .post("/board/qna", {
          qnaCategoryId,
          title,
          content,
        })
        .then((res) => {
          console.log(res);
          navigate("/board/qna");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      {/* // 헤더 영역 */}
      <div className="NavbarExample">
        <div className="NavbarButton">
          <div className="LeftButton">
            <StudyBackButton />
            <ChestNutButton />
          </div>
        </div>
      </div>
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
            value={qnaCategoryId}
            onChange={(e) => setQnaCategoryId(e.target.value)}
          >
            <option selected>유형을 선택하시오</option>
            <option value="1">랭킹</option>
            <option value="2">오픈채팅</option>
            <option value="3">학습</option>
            <option value="4">게시판</option>
            <option value="5">공지사항</option>
          </select>
        </div>

        {/* //제목 */}
        <p className="p-3 fs-5">제목</p>
        <div class="input-group mb-3">
          <input
            type="text"
            className="form-control rounded-3 text fs-5"
            placeholder="제목을 입력하시오"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* //내용 */}
        <p className="p-3 fs-5">내용</p>
        <div class="form-floating">
          <textarea
            className="form-control rounded-3 content fs-5"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => handleDetailClick(e)}
          ></textarea>
          <label for="floatingTextarea2">Comments</label>
        </div>

        {/* // 취소 등록 버튼 */}
        <div className="d-flex justify-content-between">
          <button className="nobtn fs-3" onClick={handleQnaClick}>
            취소
          </button>
          <button className="yesbtn fs-3" onClick={handleDetailClick2}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default QNAWritePage;
