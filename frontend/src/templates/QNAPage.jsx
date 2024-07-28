import { useState } from "react";
import "./MainTemplate.css";
import NavBar from "../organisms/NavBar";
import Pagenation from "../atoms/Pagenation";
import { NavLink } from "react-router-dom";
import "./QNAPage.css";

const announcements = [
  {
    title: "1월달 공지사항",
    created_at: "2024.05.27",
    hit: 79,
    announce_category_name: "학습",
    name: "운영자",
  },
  {
    title: "1월달 공지사항",
    created_at: "2024.05.27",
    hit: 33,
    announce_category_name: "공지사항",
    name: "운영자",
  },
  {
    title: "1월달 공지사항",
    created_at: "2024.05.27",
    hit: 11,
    announce_category_name: "게시판",
    name: "운영자",
  },
];

const qnas = [
  {
    title: "단순질문",
    created_at: "2024.05.27",
    is_answer: false,
    qna_category_name: "랭킹",
    name: "김시현",
  },
  {
    title: "랭킹 시스템 문의",
    created_at: "2024.05.27",
    is_answer: true,
    qna_category_name: "랭킹",
    name: "김시현",
  },
  {
    title: "랭킹 시스템 문의",
    created_at: "2024.05.27",
    is_answer: false,
    qna_category_name: "랭킹",
    name: "김시현",
  },
];

const QnaPage = () => {
  const [isAnnouncement, setIsAnnouncement] = useState(true);

  return (
    <div className="container text-start justify-center">
      <NavBar />
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
            to="announcement"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setIsAnnouncement(true)}
          >
            <button className="announcementbtn ">공지사항</button>
          </NavLink>
          <NavLink
            to="qna"
            className={({ isActive }) => (isActive ? "active" : "")}
            onClick={() => setIsAnnouncement(false)}
          >
            <button className="qnabtn">Q & A</button>
          </NavLink>
        </div>
        <button className="writebtn">글쓰기</button>
      </div>

      {/* 공지사항 or qna가 목록형 */}
      <ArticleList
        isAnnouncement={isAnnouncement}
        articleArray={isAnnouncement ? announcements : qnas}
      />
      {/* 페이지네이션 */}
      <Pagenation />
    </div>
  );
};

export default QnaPage;

const ArticleList = ({ isAnnouncement, articleArray }) => {
  return (
    <table className="table mt-3">
      <tbody className="table-group-divider">
        {articleArray.map(
          ({
            title,
            name,
            created_at,
            announce_category_name,
            hit,
            qna_category_name,
            is_answer,
          }) => (
            <tr className="row">
              <td className="col-2 d-flex align-items-center justify-content-center">
                {isAnnouncement ? announce_category_name : qna_category_name}
              </td>
              <td className="col-8">
                <span>{title}</span> <br />
                <span>
                  {name} {created_at}
                </span>
              </td>
              <td className="col-2 d-flex align-items-center justify-content-center">
                {isAnnouncement ? (
                  hit
                ) : (
                  <button
                    className={
                      is_answer ? "completed_answer" : "waiting_answer"
                    }
                  >
                    {is_answer ? "답변완료" : "답변대기"}
                  </button>
                )}
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};
