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
  // 여기서부터 작성
  const params = useParams()
  const [currentPage, setCurrentPage] = useState(Number(params.id))
  const [totalPages, setTotalPages] = useState(5)

  useEffect(()=> {
    setCurrentPage(Number(params.id))
  },[params.id])

  useEffect(() => {
    // 현재 페이지가 공지사항인지 Q&A인지에 따라 API 호출
    const fetchArticles = async () => {
      try {
        console.log(isAnnouncement);
        setLoading(true);
        const endpoint = isAnnouncement ?  "/board/announcement" : "/board/qna";
        const response = await baseApi.get(endpoint, {
          params: {
            page: `${currentPage-1}`,
            size: 10,
          },
        })
        console.log(response);
        console.log(currentPage + "현재패이지 정보");
        const data = response.data.data;


        // 상태에 데이터 저장
        if (isAnnouncement) {
          setArticles(data.announcementListPage.content || [])
          console.log('게시판');
        }
        else {
          setArticles(data.qnaList.content)
          console.log('qNA');
        }

      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles()
  }, [isAnnouncement, params.id])

  const handleWriteClick = () => {
    if (isAnnouncement) {
      navigate("/board/announcement/manager/write");
    } else {
      navigate("/board/qna/write");
    }
  };
  const onPageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    navigate(`/board/announcement/${page}`)
  }

  const upPageChange = () => {
    const nextPage = currentPage + 1
    onPageChange(nextPage)
  }

  const downPageChange = () => {
    const prevPage = currentPage - 1
    onPageChange(prevPage)
  }

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
        <Pagenation currentPage={params.id} totalPages={2} onPageChange={onPageChange} upPageChange={upPageChange} downPageChange={downPageChange}/>
      </div>
    </div>
  );
};

export default QnaPage;

const ArticleList = ({ isAnnouncement, articleArray }) => {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState("운영자");

  const handleDetailClick = (id) => {
    if (isAnnouncement) {
      navigate(`/board/announcement/detail/${id}`);
    } else {
      navigate(`/board/qna/detail/${id}`);
    }
  };

  const list = ['랭킹', '오픈채팅', '학습', '게시판', '공지사항'];

  console.log(articleArray);

 

  return (
    <table className="table mt-3">
      <tbody className="table-group-divider">
        {articleArray.map(
          ({
            announceId,
            qnaId,
            title,
            name,
            date,
            updatedAt,
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
                {isAnnouncement? <span>{updatedAt?.slice(0, 10)}</span>: <></>}
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


