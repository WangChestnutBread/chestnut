import React, { useEffect, useState } from "react";
import LogoQna from "../../molecules/Board/LogoQna";
import QnaDetail from "../../organisms/Board/QnaDetail";
import ListBtn from "../../molecules/Board/ListBtn";
import "./QnaManagerDetail.css";
import StudyBackButton from "../../molecules/StudyBackButton";
import ChestNutButton from "../../organisms/ChestNutButton";
import baseApi from "../../api/fetchAPI";
import { useParams } from "react-router-dom";
import useAuthStore from "../../stores/authStore";

const QnaManagerDetail = () => {
  const params = useParams();
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  const userId = useAuthStore((state) => state.userId);

  useEffect(() => {
    baseApi.get(`/board/qna/${params.id}`).then((res) => {
      console.log(res);
      setAnswer(res.data.data.answer);
    });
  }, []);

  const handleAnswerClick = () => {
    setShowAnswerForm(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // setSubmittedAnswer(answer);
    setShowAnswerForm(false);
  };

  const handleCancelClick = () => {
    setShowAnswerForm(false);
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleEditClick = () => {
    setShowAnswerForm(true);
  };

  console.log(params.id);

  const updateComment = (e) => {
    if (e.key === "Enter") {
      setShowAnswerForm(false);
      console.log(e);
      baseApi
        .post(`/board/qna/${params.id}/answer`, { answer: answer })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
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
      <div className="container text-start">
        {/* 로고 */}
        <LogoQna />
        {/* 질문 디테일 */}
        <QnaDetail />
        {/* 답변 창 */}
        <div className="answer p-4 mb-4 mt-5 border-bottom border-2 border-black bg-light">
          {submittedAnswer && !showAnswerForm ? (
            <div className="submitted-answer">
              <p>{submittedAnswer}</p>
              <button
                className="btn btn-secondary mt-3"
                onClick={handleEditClick}
              >
                답변 수정
              </button>
            </div>
          ) : !showAnswerForm ? (
            <div className="d-flex justify-content-between mb-3">
              {answer ? (
                <p className="mt-3">{answer}</p>
              ) : (
                <p className="mt-3">답변을 작성해주세요.</p>
              )}
              { answer ? <button
                className="successbtn mt-1 btn btn-primary"
              >
                답변 완료
              </button>: <button
                className="answerbtn mt-1 btn btn-primary"
                onClick={handleAnswerClick}
              >
                답변 작성
              </button>}
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="answer-form">
              <div className="mb-3">
                <label htmlFor="answer" className="form-label">
                  답변
                </label>
                <textarea
                  className="form-control"
                  id="answer"
                  rows="3"
                  value={answer}
                  onChange={handleAnswerChange}
                  onKeyDown={(e) => updateComment(e)}
                  required
                ></textarea>
              </div>
              <div className="d-flex justify-content-between">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={updateComment}
                >
                  제출
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancelClick}
                >
                  취소
                </button>
              </div>
            </form>
          )}
        </div>
        {/* 버튼 */}
        <ListBtn />
        <hr className="mt-5" />
      </div>
    </div>
  );
};

export default QnaManagerDetail;
