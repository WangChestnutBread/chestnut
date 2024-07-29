import './QnaDetail.css'

const answer = {
  answer: "답변 내용은 이러합니다.",
  answer_at: "2024.05.27",
  name: "관리자",
};

const QnaAnswer = () => {
  return (
    <div className="answer p-4 mb-4 mt-5 border-bottom border-2 border-black">
      <div className="d-flex justify-content-between mb-3">
        <div>{answer.answer}</div>
        <div className="text-center">
          <p>{answer.answer_at}</p>
          <p className="mt-3">{answer.name}</p>
        </div>
      </div>
    </div>
  );
};
export default QnaAnswer