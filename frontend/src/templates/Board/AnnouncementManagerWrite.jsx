import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarExample from "../NavbarExample";
import baseApi from "../../api/fetchAPI";
import useAuthStore from "./../../stores/authStore";

const AnnouncementManagerWrite = () => {
  const userId = useAuthStore((state) => state.userId);
  const navigate = useNavigate();

  // State for form inputs
  const [announceCategoryId, setAnnounceCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleQnaClick = () => {
    navigate("/board/announcement/1");
  };

  const handleDetailClick2 = () => {
    if (title.length < 3){
      alert("제목 3글자 이상 적어주세요")
      return
    }
    else if (content.length < 10){
      alert("내용을 10글자 이상 적어주세요")
      return
    }
    else if (!announceCategoryId){
      alert('유형선택 부탁드립니다.')
      return
    }
    baseApi
        .post("/board/announcement", {
          announceCategoryId,
          title,
          content,
          loginId: `${userId}`,
        })
        .then((res) => {
          console.log(res);
          navigate("/board/announcement/1");
        })
        .catch((error) => {
          console.log(error);
        });
  }

  return (
    <div>
      {/* 헤더 영역 */}
      <NavbarExample/>
      <div className="container text-start justify-center">
        {/* 메인타이틀 QNA */}
        <div className="logo-container">
          <div className="position-relative">
            <img src="/image/Logo.png" alt="밤빵" className="logo" style={{width:"260px", height:"110px"}}/>
            <span className="qna position-absolute bottom-0 start-100">
              게시판
            </span>
          </div>
        </div>
        {/* 공지 유형 */}
        <div>
          <p className="p-3 fs-5">공지유형</p>
          <select
            className="form-select rounded-3 selected fs-5"
            aria-label="Default select example"
            value={announceCategoryId}
            onChange={(e) => setAnnounceCategoryId(e.target.value)}
          >
            <option value="">유형을 선택하시오</option>
            <option value="1">회원정보</option>
            <option value="2">학습</option>
            <option value="3">오픈채팅</option>
            <option value="4">대화연습</option>
            <option value="5">보상</option>
            <option value="6">기타</option>
          </select>
        </div>

        {/* 제목 */}
        <p className="p-3 fs-5">제목</p>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control rounded-3 text fs-5"
            placeholder="제목을 입력하시오"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* 내용 */}
        <p className="p-3 fs-5">내용</p>
        <div className="form-floating">
          <textarea
            className="form-control rounded-3 content fs-5"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <label htmlFor="floatingTextarea2">Comments</label>
        </div>

        {/* 취소 등록 버튼 */}
        <div className="d-flex justify-content-between">
          <button className="nobtn fs-3" onClick={handleQnaClick} style={{border:"none"}}>
            취소
          </button>
          <button className="yesbtn fs-3" onClick={handleDetailClick2} style={{border:"none"}}>
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementManagerWrite;
