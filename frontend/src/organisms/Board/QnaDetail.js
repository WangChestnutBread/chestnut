import './QnaDetail.css'

const announcement = {
  qnaCategory: "(랭킹)",
  title: "랭킹 시스템 문의",
  content: "랭킹시스템 방식에 대해서 문의 합니다.",
  created_at: "2024.05.27",
  name: "김시현",
};

const answer = {
  answer: "답변 내용은 이러합니다.",
  answer_at: "2024.05.27",
  name: "관리자",
};

const QnaDetail = () => {
  return (
    <div className="qna-detail p-4 mb-4 mt-5 border-top border-4 border-black">
      <div className="d-flex justify-content-between mb-3">
        <div>
          <p className="mt-2">
            {announcement.qnaCategory}
            {announcement.title}
          </p>
        </div>
        <div className="text-center">
          <p>{announcement.created_at}</p>
          <p className="mt-3">{announcement.name}</p>
        </div>
      </div>
      <div className="mt-5">
        <p>{announcement.content}</p>
      </div>
    </div>
  );
};
export default QnaDetail;
