import NavBar from "../../organisms/NavBar";
import QnaDetail from "../../organisms/Board/QnaDetail";
import "./AnnouncementDetail.css";
import LogoAnnouncement from "../../molecules/Board/LogoAnnouncement";
import QnaAnswer from "../../organisms/Board/QnaAnswer";
import { useParams } from "react-router-dom";
import baseApi from "../../api/fetchAPI";
import useAuthStore from "../../stores/authStore";

const AnnouncementDetail = () => {
  const userId = useAuthStore((state)=>(state.userId))
  const params = useParams();
  console.log(params);

  const deleteAnnouncement = () => {
    baseApi.delete(`board/announcement/${params.id}`).then((res) => {
      console.log(res);
    });
  };

  const updateAnnouncement = () => {
    baseApi
      .put(`board/announcement/${params.id}`, {
        announceId: "1",
        announceCategoryId: "1",
        title: "너무너무수정할게많아요ㅜㅜㅜ",
        content: "하지만재밌어요",
        loginId: `${userId}`,
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      {/* 헤더 */}
      <NavBar />
      <div className="container text-start">
        {/* 로고 */}
        <LogoAnnouncement />
        {/* Qna 내용 */}
        <QnaDetail />
        {/* answer 내용 */}
        <QnaAnswer />
        {/* 삭제 수정 버튼 */}
        <div className="row justify-content-evenly">
          <button className="deletebtn" onClick={deleteAnnouncement}>
            삭제
          </button>
          <button className="updatebtn" onClick={updateAnnouncement}>
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetail;
