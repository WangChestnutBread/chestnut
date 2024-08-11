import './AnnouncementDetail.css'
import LogoAnnouncement from "../../molecules/Board/LogoAnnouncement";
import { useNavigate, useParams } from "react-router-dom";
import baseApi from "../../api/fetchAPI";
import AnnouncementTitle from "../../organisms/Board/AnnouncementTitle";
import AnnouncementContent from "../../organisms/Board/AnnouncementContent"
import StudyBackButton from "../../molecules/StudyBackButton";
import ChestNutButton from "../../organisms/ChestNutButton";

const AnnouncementDetail = () => {
  const params = useParams();
  const navigate = useNavigate()
  console.log(params);

  const deleteAnnouncement = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("삭제하시겠습니까?")) {
      baseApi.delete(`/board/announcement/${params.id}`).then((res) => {
        console.log(res);
        navigate(`/board/announcement`);
      });
    } else {
      navigate(`/board/announcement/detail/${params.id}`);
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
