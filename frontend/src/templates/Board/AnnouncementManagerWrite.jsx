// import { useEffect } from "react";
// import StudyBackButton from "../../molecules/StudyBackButton";
// import ChestNutButton from "../../organisms/ChestNutButton";
// import "./QnaWriteTemplate.css";
// import { useNavigate } from "react-router-dom";
// import baseApi from "../../api/fetchAPI";

// const handleDetailClick = () => {
//   const token = localStorage.getItem('accessToken'); // 저장된 토큰을 가져옵니다.

//   if (!token) {
//     console.error("토큰이 없습니다. 로그인 상태를 확인하세요.");
//     return;
//   }

//   baseApi
//     .post('/board/announcement', {
//       announceCategoryId: "1",
//       title: "밤이다.",
//       content: "군밤장수",
//       loginId: "kitty123",
//     }, {
//       headers: {
//         Authorization: `Bearer ${token}` // 헤더에 토큰 추가
//       }
//     })
//     .then((res) => {
//       console.log("응답 데이터:", res.data);
//       navigate('/board/qna'); // 요청 성공 시 경로 변경
//     })
//     .catch((error) => {
//       console.error("POST 요청 중 오류 발생:", error);
//       if (error.response) {
//         console.error("서버 응답 오류 메시지:", error.response.data);
//       }
//     });
// };

// const AnnouncementManagerWrite = () => {
//   const navigate = useNavigate();
//   const handleQnaClick = () => {
//     navigate("/board/qna");
//   };
//   const handleDetailClick = () => {
//     baseApi
//       .post(`/board/announcement`, {
//         announceCategoryId: "1",
//         title: "밤이다.",
//         content: "군밤장수",
//         loginId: "duli123",
//       })
//       .then((res) => {
//         console.log(res);
//       });
//     navigate("/board/qna");
//   };

//   return (
//     <div>
//       {/* // 헤더 영역 */}
//       <div className="NavbarExample">
//         <div className="NavbarButton">
//           <div className="LeftButton">
//             <StudyBackButton />
//             <ChestNutButton />
//           </div>
//         </div>
//       </div>
//       <div className="container text-start justify-center">
//         {/* // 메인타이틀 QNA */}
//         <div className="logo-container">
//           <div className="position-relative">
//             <img src="/image/Logo.png" alt="밤빵" className="logo" />
//             <span className="qna position-absolute bottom-0 start-100">
//               게시판
//             </span>
//           </div>
//         </div>
//         {/* // 공지 유형 */}
//         <div>
//           <p className="p-3 fs-5">공지유형</p>
//           <select
//             className="form-select rounded-3 selected fs-5"
//             aria-label="Default select example"
//           >
//             <option selected>유형을 선택하시오</option>
//             <option value="1">유형1</option>
//             <option value="2">유형2</option>
//             <option value="3">유형3</option>
//             <option value="4">유형4</option>
//             <option value="5">유형5</option>
//             <option value="6">유형6</option>
//             <option value="7">유형7</option>
//           </select>
//         </div>

//         {/* //제목 */}
//         <p className="p-3 fs-5">제목</p>
//         <div class="input-group mb-3">
//           <input
//             type="text"
//             className="form-control rounded-3 text fs-5"
//             placeholder="제목을 입력하시오"
//           />
//         </div>
//         {/* //내용 */}
//         <p className="p-3 fs-5">내용</p>
//         <div class="form-floating">
//           <textarea
//             className="form-control rounded-3 content fs-5"
//             placeholder="Leave a comment here"
//             id="floatingTextarea2"
//           ></textarea>
//           <label for="floatingTextarea2">Comments</label>
//         </div>

//         {/* // 취소 등록 버튼 */}
//         <div className="d-flex justify-content-between">
//           <button className="nobtn fs-3" onClick={handleQnaClick}>
//             취소
//           </button>
//           <button className="yesbtn fs-3" onClick={handleDetailClick}>
//             등록
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnnouncementManagerWrite;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudyBackButton from "../../molecules/StudyBackButton";
import ChestNutButton from "../../organisms/ChestNutButton";
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
    navigate("/board/qna/1");
  };

  const handleDetailClick = (e) => {
    if (e.key === "Enter") {
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
  };

  const handleDetailClick2 = () => {
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
      <div className="NavbarExample">
        <div className="NavbarButton">
          <div className="LeftButton">
            <StudyBackButton />
            <ChestNutButton />
          </div>
        </div>
      </div>
      <div className="container text-start justify-center">
        {/* 메인타이틀 QNA */}
        <div className="logo-container">
          <div className="position-relative">
            <img src="/image/Logo.png" alt="밤빵" className="logo" />
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
            <option value="1">랭킹</option>
            <option value="2">오픈채팅</option>
            <option value="3">학습</option>
            <option value="4">게시판</option>
            <option value="5">공지사항</option>
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
            onKeyDown={(e) => handleDetailClick(e)}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <label htmlFor="floatingTextarea2">Comments</label>
        </div>

        {/* 취소 등록 버튼 */}
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

export default AnnouncementManagerWrite;
