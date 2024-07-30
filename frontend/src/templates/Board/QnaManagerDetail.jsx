import React, { useState } from 'react';
import NavBar from "../../organisms/NavBar";
import LogoQna from "../../molecules/Board/LogoQna";
import QnaDetail from "../../organisms/Board/QnaDetail";
import ListBtn from "../../molecules/Board/ListBtn";
import './QnaManagerDetail.css';

const QnaManagerDetail = () => {
  const [showAnswerForm, setShowAnswerForm] = useState(false);
  const [answer, setAnswer] = useState('');
  const [submittedAnswer, setSubmittedAnswer] = useState('');

  const handleAnswerClick = () => {
    setShowAnswerForm(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSubmittedAnswer(answer);
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

  return (
    <div>
      {/* 헤더 */}
      <NavBar />
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
              <button className="btn btn-secondary mt-3" onClick={handleEditClick}>답변 수정</button>
            </div>
          ) : (
            !showAnswerForm ? (
              <div className="d-flex justify-content-between mb-3">
                <p className="mt-3">답변을 작성해주세요.</p>
                <button className="answerbtn mt-1 btn btn-primary" onClick={handleAnswerClick}>답변 작성</button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="answer-form">
                <div className="mb-3">
                  <label htmlFor="answer" className="form-label">답변</label>
                  <textarea className="form-control" id="answer" rows="3" value={answer} onChange={handleAnswerChange} required></textarea>
                </div>
                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-primary">제출</button>
                  <button type="button" className="btn btn-secondary" onClick={handleCancelClick}>취소</button>
                </div>
              </form>
            )
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
