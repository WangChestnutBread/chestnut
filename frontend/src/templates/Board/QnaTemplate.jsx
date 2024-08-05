// import { useState } from "react";
// import "../MainTemplate.css";
// import NavBar from "../../organisms/NavBar";
// import Pagenation from "../../atoms/Pagenation";
// import { NavLink, useNavigate } from "react-router-dom";
// import "./QnaTemplate.css";
// import "../NavbarExample.css"
// import StudyBackButton from "../../molecules/StudyBackButton";
// import ChestNutButton from "../../organisms/ChestNutButton";


// const announcements = [
//   {
//     id: 1,
//     title: "1월달 공지사항",
//     created_at: "2024.05.27",
//     hit: 79,
//     announce_category_name: "학습",
//     name: "운영자",
//     authentication: true,
//   },
//   {
//     id: 2,
//     title: "1월달 공지사항",
//     created_at: "2024.05.27",
//     hit: 33,
//     announce_category_name: "공지사항",
//     name: "운영자",
//     authentication: true,
//   },
//   {
//     id: 3,
//     title: "1월달 공지사항",
//     created_at: "2024.05.27",
//     hit: 11,
//     announce_category_name: "게시판",
//     name: "운영자",
//     authentication: true,
//   },
// ];

// const qnas = [
//   {
//     id: 1,
//     title: "단순질문",
//     created_at: "2024.05.27",
//     is_answer: false,
//     qna_category_name: "랭킹",
//     name: "김시현",
//   },
//   {
//     id: 2,
//     title: "랭킹 시스템 문의",
//     created_at: "2024.05.27",
//     is_answer: true,
//     qna_category_name: "랭킹",
//     name: "김시현",
//   },
//   {
//     id:3,
//     title: "랭킹 시스템 문의",
//     created_at: "2024.05.27",
//     is_answer: false,
//     qna_category_name: "랭킹",
//     name: "김시현",
//   },
// ];

// const QnaPage = () => {
//   const [isAnnouncement, setIsAnnouncement] = useState(true);
  
//   const navigate = useNavigate();

//   const handleWriteClick = () => {
//     if (isAnnouncement) {
//       navigate("/board/announcement/write");
//     }
//     else {
//       navigate("/board/qna/write");
//     }
   
//   };
//   console.log(announcements[0].name);
//   return (
//     <div>
//       {/* 헤더 */}
//       <div className="NavbarExample">
//         <div className="NavbarButton">
//           <div className="LeftButton">
//               <StudyBackButton/>
//               <ChestNutButton/>
//           </div>
//         </div>
//       </div>
//       {/* 로고 */}
//       <div className="container text-start justify-center">
//         <div className="logo-container">
//           <div className="position-relative">
//             <img src="/image/Logo.png" alt="밤빵" className="logo" />
//             <span className="qna position-absolute bottom-0 start-100">
//               {isAnnouncement ? "게시판" : "Q&A"}
//             </span>
//           </div>
//         </div>
//         {/* 공지사항 & qna 전환 탭 */}
//         <div className="d-flex justify-content-between mt-5">
//           <div className="btn-container d-flex gap-3">
//             <NavLink
//               to="/board/announcement"
//               className={({ isActive }) => (isActive ? "active" : "")}
//               onClick={() => setIsAnnouncement(true)}
//             >
//               <button className="announcementbtn">
//                 공지사항
//               </button>
//             </NavLink>
//             <NavLink
//               to="/board/qna"
//               className={({ isActive }) => (isActive ? "active" : "")}
//               onClick={() => setIsAnnouncement(false)}
//             >
//               <button className="qnabtn">
//                 Q & A
//               </button>
//             </NavLink>
//           </div>
//             {announcements[0].name === '운영자' &&( <button className="writebtn" onClick={handleWriteClick}>
//               글쓰기
//             </button>)}
//         </div>

//         {/* 공지사항 or qna가 목록형 */}
//         <ArticleList
//           isAnnouncement={isAnnouncement}
//           articleArray={isAnnouncement ? announcements : qnas}
//         />
//         {/* 페이지네이션 */}
//         <Pagenation />
//       </div>
//     </div>
//   );
// };

// export default QnaPage;

// const ArticleList = ({ isAnnouncement, articleArray,  }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState("운영자")
//   const navigate = useNavigate()

//   const handleDetailClick = (id) => {
//     if (isAnnouncement) {
//       navigate(`/board/announcement/detail/${id}`)}
//     else {
//       navigate(`/board/qna/detail/${id}`)
//     }
//   }
//   // console.log(isAuthenticated);
//   return (
    
//     <table className="table mt-3">
//       <tbody className="table-group-divider">
//         {articleArray.map(
//           ({
//             id,
//             title,
//             name,
//             created_at,
//             announce_category_name,
//             hit,
//             qna_category_name,
//             is_answer,
//           }) => (
//             <tr className="row">
//               <td className="col-2 d-flex align-items-center justify-content-center">
//                 {isAnnouncement ? announce_category_name : qna_category_name}
//               </td>
//               <td className="col-8 detail" onClick={()=>handleDetailClick(id)}>
//                 <span>{title}</span> <br />
//                 <span>
//                   {name} {created_at}
//                 </span>
//               </td>
//               <td className="col-2 d-flex align-items-center justify-content-center">
//                 {isAnnouncement ? (
//                   hit
//                 ) : (
//                   <button
//                     className={
//                       is_answer ? "completed_answer" : "waiting_answer"
//                     }
//                     onClick={() => {
//                       if (isAuthenticated === '운영자') {
//                         navigate("/board/qna/manager")
//                       }
//                     }}
//                   >
//                     {is_answer ? "답변완료" : isAuthenticated === '운영자' ? "답변작성" : "답변대기" }
//                   </button>
//                 )}
//               </td>
//             </tr>
//           )
//         )}
//       </tbody>
//     </table>
//   );
// };


import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../MainTemplate.css";
import "../NavbarExample.css";
import "./QnaTemplate.css";
import StudyBackButton from "../../molecules/StudyBackButton";
import ChestNutButton from "../../organisms/ChestNutButton";
import Pagenation from "../../atoms/Pagenation";
import baseApi from "../../api/fetchAPI";

const QnaPage = () => {
  const [isAnnouncement, setIsAnnouncement] = useState(true);
  const [articles, setArticles] = useState([]); // 공지사항 데이터를 저장하는 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const navigate = useNavigate(); // 

  useEffect(() => {
    // 현재 페이지가 공지사항인지 Q&A인지에 따라 API 호출
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const endpoint = isAnnouncement ?  "/board/announcement" : "/board/qna";
        const response = await baseApi.get(endpoint, {
          params: {
            page: 0,
            size: 10,
          },
        })

        const data = response.data.data;

        // 상태에 데이터 저장
        setArticles(data.announcementListPage.content || []);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [isAnnouncement]);

  const handleWriteClick = () => {
    if (isAnnouncement) {
      navigate("/board/announcement/manager/write");
    } else {
      navigate("/board/qna/write");
    }
  };

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
      {/* 로고 */}
      <div className="container text-start justify-center">
        <div className="logo-container">
          <div className="position-relative">
            <img src="/image/Logo.png" alt="밤빵" className="logo" />
            <span className="qna position-absolute bottom-0 start-100">
              {isAnnouncement ? "게시판" : "Q&A"}
            </span>
          </div>
        </div>
        {/* 공지사항 & qna 전환 탭 */}
        <div className="d-flex justify-content-between mt-5">
          <div className="btn-container d-flex gap-3">
            <NavLink
              to="/board/announcement"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setIsAnnouncement(true)}
            >
              <button className="announcementbtn">공지사항</button>
            </NavLink>
            <NavLink
              to="/board/qna"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setIsAnnouncement(false)}
            >
              <button className="qnabtn">Q & A</button>
            </NavLink>
          </div>

          <button className="writebtn" onClick={handleWriteClick}>
            글쓰기
          </button>
        </div>

        {/* 공지사항 목록 */}
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <ArticleList isAnnouncement={isAnnouncement} articleArray={articles} />
        )}
        {/* 페이지네이션 */}
        <Pagenation />
      </div>
    </div>
  );
};

export default QnaPage;

const ArticleList = ({ isAnnouncement, articleArray }) => {
  const navigate = useNavigate();

  const handleDetailClick = (id) => {
    navigate(`/board/announcement/detail/${id}`);
  };
  const list = ['랭킹', '오픈채팅', '학습', '게시판', '공지사항']


  return (
    <table className="table mt-3">
      <tbody className="table-group-divider">
        {articleArray.map(
          ({
            announceId,
            title,
            date,
            updatedAt,
            hit,
            announceCategoryId,
          }) => (
            <tr key={announceId} className="row">
              <td className="col-2 d-flex align-items-center justify-content-center">
                {list[announceCategoryId-1]}
              </td>
              <td className="col-8 detail" onClick={() => handleDetailClick(announceId)}>
          
                <span>{title}</span> <br /> <br />
                <span>운영자</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>{updatedAt.slice(0,10)}</span>
               
              </td>
              <td className="col-2 d-flex align-items-center ">
                <div>
               <img src="/image/eye.png" alt="눈" className="m-2" /></div> <div>{Math.floor(hit / 2)}</div> 
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};
