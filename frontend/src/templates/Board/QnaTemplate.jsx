import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "../Main/MainTemplate.css";
import "../NavbarExample.css";
import "./QnaTemplate.css";
import NavbarExample from "../NavbarExample";
import Pagenation from "../../atoms/Pagenation";
import baseApi from "../../api/fetchAPI";
import useAuthStore from "../../stores/authStore";


const QnaPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isAnnouncement, setIsAnnouncement] = useState(true);
  const [articles, setArticles] = useState([]); // 공지사항 데이터를 저장하는 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [currentPage, setCurrentPage] = useState(Number(params.id));
  const [totalPages, setTotalPages] = useState(5);

  const manager = useAuthStore((state) => state.manager)

  useEffect(() => {
    // 현재 URL 경로를 기반으로 isAnnouncement의 초기 값을 설정
    const path = window.location.pathname;
    if (path.includes("qna")) {
      setIsAnnouncement(false);
    } else {
      setIsAnnouncement(true);
    }
    setCurrentPage(Number(params.id));
  }, [params.id]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const endpoint = isAnnouncement ? "/board/announcement" : "/board/qna";
        const response = await baseApi.get(endpoint, {
          params: {
            page: `${currentPage - 1 }`,
            size: 10,
          },
        });
        const data = response.data.data;
        console.log(data);

        if (window.location.pathname.includes('announcement')) {
          setTotalPages(data.announcementListPage.totalPages);
          setArticles(data.announcementListPage.content);
        } else {
          setTotalPages(data.qnaList.totalPages);
          setArticles(data.qnaList.content );
        }
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [isAnnouncement, currentPage]); // currentPage를 의존성 배열에 포함

  const handleWriteClick = () => {
    if (isAnnouncement) {
      navigate("/board/announcement/manager/write");
    } else {
      navigate("/board/qna/write");
    }
  };

  const onPageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page); // currentPage 상태 업데이트
    if (isAnnouncement) {
      navigate(`/board/announcement/${page}`);
    } else {
      navigate(`/board/qna/${page}`);
    }
  };

  const upPageChange = () => {
    const nextPage = currentPage + 1;
    onPageChange(nextPage);
  };

  const downPageChange = () => {
    const prevPage = currentPage - 1;
    onPageChange(prevPage);
  };

  // 공지사항 <-> Q&A 전환 시 currentPage를 1로 초기화
  const handleTabSwitch = (isAnnouncementSelected) => {
    setIsAnnouncement(isAnnouncementSelected);
    setCurrentPage(1);
    if (isAnnouncementSelected) {
      navigate(`/board/announcement/1`);
    } else {
      navigate(`/board/qna/1`);
    }
  };

  return (
    <div>
      {/* 헤더 */}
      <NavbarExample/>
      {/* 로고 */}
      <div className="container text-start justify-center">
        <div className="logo-container">
          <div className="position-relative">
            <img
              src="/image/Logo.png"
              alt="밤빵"
              className="logo"
              style={{ width: "260px", height: "110px" }}
            />
            <span className="qna position-absolute bottom-0 start-100">
              {isAnnouncement ? "게시판" : "Q&A"}
            </span>
          </div>
        </div>
        {/* 공지사항 & qna 전환 탭 */}
        <div className="d-flex justify-content-between mt-5">
          <div className="btn-container d-flex gap-3">
            <NavLink
              to={`/board/announcement/${currentPage}`}
              className={({ isActive }) => (isActive ? "active" : "no-active")}
              onClick={() => handleTabSwitch(true)}
            >
              <button
                className="announcementbtn"
                style={{
                  backgroundColor: isAnnouncement ? "#6B3906" : "#DCB78F",
                  color: isAnnouncement ? "white" : "black",
                  border: "none",
                }}
              >
                공지사항
              </button>
            </NavLink>
            <NavLink
              to={`/board/qna/${currentPage}`}
              className={({ isActive }) => (isActive ? "active" : "no-active")}
              onClick={() => handleTabSwitch(false)}
            >
              <button
                className="qnabtn"
                style={{
                  backgroundColor: !isAnnouncement ? "#6B3906" : "#DCB78F",
                  color: !isAnnouncement ? "white" : "black",
                  border: "none",
                }}
              >
                Q & A
              </button>
            </NavLink>
          </div>

          { !isAnnouncement || manager ?  <button
            className="writebtn"
            onClick={handleWriteClick}
            style={{ border: "none" }}
          >
            글쓰기
          </button> : <></>}
        </div>

        {/* 공지사항 목록 */}
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <ArticleList
            isAnnouncement={isAnnouncement}
            articleArray={articles}
            manager={manager}
          />
        )}
        {/* 페이지네이션 */}
        <div className="mt-5 mb-5">
          <Pagenation
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            upPageChange={upPageChange}
            downPageChange={downPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default QnaPage;

const ArticleList = ({ isAnnouncement, articleArray, manager }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState("운영자");

  const handleDetailClick = (id) => {
    if (isAnnouncement) {
      navigate(`/board/announcement/detail/${id}`);
    } else {
      navigate(`/board/qna/detail/${id}`);
    }
  };

  const list = ["회원정보", "학습", "오픈채팅", "대화연습", "보상", "기타"];
  console.log(articleArray.nickname);

  return (
    <>
      {articleArray.length > 0 ? (
        <table className="table mt-3">
          <tbody className="table-group-divider">
            {articleArray.map(
              ({
                announceId,
                qnaId,
                title,
                name,
                nickname,
                updatedAt,
                createdAt,
                hit,
                announceCategoryId,
                qnaCategoryId,
                isAnswer,
              }) => (
                <tr key={isAnnouncement ? announceId : qnaId} className="row">
                  <td className="col-2 d-flex align-items-center justify-content-center">
                    {isAnnouncement
                      ? list[announceCategoryId - 1]
                      : list[qnaCategoryId - 1]}
                  </td>
                  <td
                    className="col-8 detail"
                    onClick={() =>
                      handleDetailClick(isAnnouncement ? announceId : qnaId)
                    }
                  >
                    <br /> <span style={{ fontSize: "18px" }}>{title}</span> <br />
                    <div className="text-end">
                      <span>{nickname || "운영자"}</span>
                      <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
  
                      {isAnnouncement ? (
                        <span>{`${updatedAt?.slice(0, 1)}-${updatedAt?.slice(
                          1,
                          2
                        )}-${updatedAt?.slice(2, 3)}`}</span>
                      ) : (
                        <span>{`${createdAt?.slice(0, 1)}-${createdAt?.slice(
                          1,
                          2
                        )}-${createdAt?.slice(2, 3)}`}</span>
                      )}
                    </div>
                  </td>
                  <td className="col-2 d-flex align-items-center justify-content-center">
                    {isAnnouncement ? (
                      <>
                        <div>
                          <img src="/image/eye.png" alt="눈" className="m-2" style={{width: "15px"}} />
                        </div>
                        <div>{Math.floor(hit / 4)}</div>
                      </>
                    ) : manager ? (
                       <button
                        className={isAnswer ? "completed_answer" : "waiting_answer"}
                        onClick={() => {
                          if (isAuthenticated === "운영자") {
                            navigate(`/board/qna/manager/${qnaId}`);
                          }
                        }}
                        style={{border:"none"}}
                      >
                        {isAnswer
                          ? "답변완료"
                          : "답변작성"
                         } 
                      </button> 
                    ): (
                      <p>
                        {isAnswer
                            ? "답변완료"
                            : "답변대기"} 
                      </p>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      ) : (
        <div className="text-center mt-5" style={{fontSize:"2rem"}}>데이터가 없습니다</div>
      )}
    </>
  );
};
