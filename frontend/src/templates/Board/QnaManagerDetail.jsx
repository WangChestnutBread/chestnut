import React, { useEffect, useState } from "react";
import LogoQna from "../../molecules/Board/LogoQna";
import QnaDetail from "../../organisms/Board/QnaDetail";
import ListBtn from "../../molecules/Board/ListBtn";
import "./QnaManagerDetail.css";
import NavbarExample from "../NavbarExample";
import baseApi from "../../api/fetchAPI";
import { useParams } from "react-router-dom";
import useAuthStore from "../../stores/authStore";

const QnaManagerDetail = () => {
  const params = useParams();
  const [answer, setAnswer] = useState(null);
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  const userId = useAuthStore((state) => state.userId);

  useEffect(() => {
    baseApi.get(`/board/qna/${params.id}`).then((res) => {
      console.log(res);
      setAnswer(res.data.data.answer);
    });
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    updateComment();
  };

  const handleCancelClick = () => {
    setSubmittedAnswer(""); 
  };

  console.log(params.id);

  const updateComment = (e) => {
    baseApi.post(`/board/qna/${params.id}/answer`,{
      answer: submittedAnswer
    }).then((res)=> {
      console.log(res);
      setAnswer(submittedAnswer);
      setSubmittedAnswer("");
    }).catch((err) => {
      console.log(err);
    })
  };

  const formatAnswer = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br/>
      </React.Fragment>
    ));
  };

  return (
    <div>
      <NavbarExample/>
      <div className="container text-start">
        {/* 로고 */}
        <LogoQna />
        {/* 버튼 */}
        <ListBtn />
        {/* 질문 디테일 */}
        <QnaDetail />
        {/* 답변 창 */}
        <div className="answer pt-3 pb-3 ps-4 pe-4 mb-4 mt-2">
          {!answer ? (
            <form onSubmit={handleFormSubmit} style={{paddingBottom: 30}}>
              <div className="form-floating">
                <textarea
                  className="form-control rounded-3 content fs-6 mb-5"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  value={submittedAnswer}
                  onChange={(e) => setSubmittedAnswer(e.target.value)}
                  style={{background:"#f8f9fa", border: "none", padding: 0, whiteSpace: "pre-wrap"}}
                ></textarea>
              </div>
              <div className="d-flex justify-content-end" style={{gap: "10px"}}>
                <button
                  type="submit"
                  className="btn fs-5"
                  style={{height:"40px",width:"78px",background:"#DCB78F",borderRadius:"10px",color:"black"}}
                >
                  제출
                </button>
                <button
                  type="button"
                  className="btn fs-5"
                  onClick={handleCancelClick}
                  style={{height:"40px",width:"78px",background:"#D8D8D8",borderRadius:"10px",color:"black"}}
                >
                  취소
                </button>
              </div>
            </form>
          ) : (
              <div className="submitted-answer" style={{whiteSpace: "pre-wrap"}}>
                <p>{formatAnswer(answer)}</p>
              </div>
          )}
        </div>
        <div className="mt-5" />
      </div>
    </div>
  );
};

export default QnaManagerDetail;
