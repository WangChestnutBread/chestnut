import './AnnouncementDetail.css'
import LogoAnnouncement from "../../molecules/Board/LogoAnnouncement";
import { useNavigate, useParams } from "react-router-dom";
import baseApi from "../../api/fetchAPI";
import useAuthStore from "../../stores/authStore";
import AnnouncementTitle from "../../organisms/Board/AnnouncementTitle";
import AnnouncementContent from "../../organisms/Board/AnnouncementContent"
import StudyBackButton from "../../molecules/StudyBackButton";
import ChestNutButton from "../../organisms/ChestNutButton";

const AnnouncementDetail = () => {
  const userId = useAuthStore((state)=>(state.userId))
  const params = useParams();
  const navigate = useNavigate()
  console.log(params);

  const deleteAnnouncement = () => {
    if (confirm("삭제하시겠습니까?")) {
      baseApi.delete(`/board/announcement/${params.id}`).then((res) => {
        console.log(res);
        navigate(`/board/announcement`);
      });
    } else {
      navigate(`/board/announcement/detail/${params.id}`);
    }
  };

  // const updateAnnouncement = () => {
  //   baseApi
  //     .put(`board/announcement/${params.id}`, {
  //       announceId: "1",
  //       announceCategoryId: "1",
  //       title: "너무너무수정할게많아요ㅜㅜㅜ",
  //       content: "하지만재밌어요",
  //       loginId: `${userId}`,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       navigate('/board/announcement')
  //     });
  // };

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
        <LogoAnnouncement />
        {/* 게시판 제목 */}
        <AnnouncementTitle />
        {/* 게시판 내용 */}
        <AnnouncementContent />
        {/* 삭제 수정 버튼 */}
        <div className="row justify-content-evenly">
          <button className="deletebtn" onClick={deleteAnnouncement}>
            삭제
          </button>
          {/* <button className="updatebtn" onClick={updateAnnouncement}>
            수정
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetail;
