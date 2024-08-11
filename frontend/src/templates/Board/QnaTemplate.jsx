import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
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
  const navigate = useNavigate(); 
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(Number(params.id));
  const [totalPages, setTotalPages] = useState(5);

  useEffect(() => {
    setCurrentPage(Number(params.id));
  }, [params.id]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const endpoint = isAnnouncement ? "/board/announcement" : "/board/qna";
        const response = await baseApi.get(endpoint, {
          params: {
            page: `${currentPage - 1}`,
            size: 10,
          },
        });
        const data = response.data.data;
        if (isAnnouncement){
          setTotalPages(response.data.data.announcementListPage.totalPages)
        }
        else {
          setTotalPages(response.data.data.qnaList.totalPages)
        }
       
        

        if (isAnnouncement) {
          setArticles(data.announcementListPage.content || []);
        } else {
          setArticles(data.qnaList.content);
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
    navigate(`/board/announcement/${page}`);
  };

  const upPageChange = () => {
    const nextPage = currentPage + 1;
    onPageChange(nextPage);
  };

  const downPageChange = () => {
    const prevPage = currentPage - 1;
    onPageChange(prevPage);
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
              to={`/board/announcement/${currentPage}`}
              className={({ isActive }) => (isActive ? "active" : "no-active")}
              onClick={() => setIsAnnouncement(true)}
            >
              <button className="announcementbtn">공지사항</button>
            </NavLink>
            <NavLink
              to={`/board/qna/${currentPage}`}
              className={({ isActive }) => (isActive ? "active" : "no-active")}
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
        <Pagenation currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} upPageChange={upPageChange} downPageChange={downPageChange} />
      </div>
    </div>
  );
};

export default QnaPage;

const ArticleList = ({ isAnnouncement, articleArray }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState("운영자")

  const handleDetailClick = (id) => {
    if (isAnnouncement) {
      navigate(`/board/announcement/detail/${id}`);
    } else {
      navigate(`/board/qna/detail/${id}`);
    }
  };

  const list = ['랭킹', '오픈채팅', '학습', '게시판', '공지사항'];

  return (
    <table className="table mt-3">
      <tbody className="table-group-divider">
        {articleArray.map(
          ({
            announceId,
            qnaId,
            title,
            name,
            updatedAt,
            createdAt,
            hit,
            announceCategoryId,
            qnaCategoryId,
            isAnswer,
          }) => (
            <tr key={isAnnouncement ? announceId : qnaId} className="row">
              <td className="col-2 d-flex align-items-center justify-content-center">
                {isAnnouncement ? list[announceCategoryId - 1] : list[qnaCategoryId - 1]}
              </td>
              <td className="col-8 detail" onClick={() => handleDetailClick(isAnnouncement ? announceId : qnaId)}>
                <span>{title}</span> <br /> <br />
                <span>{name || '운영자'}</span>
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {isAnnouncement? <span>{`${updatedAt?.slice(0, 1)}-${updatedAt?.slice(1, 2)}-${updatedAt?.slice(2,3)}`}</span> : <span>{`${createdAt?.slice(0, 1)}-${createdAt?.slice(1, 2)}-${createdAt?.slice(2,3)}`}</span>}
              </td>
              <td className="col-2 d-flex align-items-center justify-content-center">
                {isAnnouncement ? (
                  <>
                    <div>
                      <img src="/image/eye.png" alt="눈" className="m-2" />
                    </div>
                    <div>{Math.floor(hit / 4)}</div>
                  </>
                ) : (
                  <button
                    className={isAnswer ? "completed_answer" : "waiting_answer"}
                    onClick={() => {
                      if (isAuthenticated === '운영자') {
                        navigate(`/board/qna/manager/${qnaId}`)
                      }
                    }}
                  >
                    {isAnswer ? "답변완료" : isAuthenticated === '운영자' ? "답변작성" : "답변대기"}
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
