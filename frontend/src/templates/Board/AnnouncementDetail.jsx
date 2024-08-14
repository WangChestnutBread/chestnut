import React, { useState, useEffect } from 'react';
import './AnnouncementDetail.css';
import LogoAnnouncement from "../../molecules/Board/LogoAnnouncement";
import { useNavigate, useParams } from "react-router-dom";
import baseApi from "../../api/fetchAPI";
import AnnouncementTitle from "../../organisms/Board/AnnouncementTitle";
import AnnouncementContent from "../../organisms/Board/AnnouncementContent";
import NavbarExample from '../NavbarExample';
import useAuthStore from '../../stores/authStore';

const AnnouncementDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 여부
  const [title, setTitle] = useState(""); // 제목 상태
  const [content, setContent] = useState(""); // 내용 상태
  const [announceId, setAnnounceId] = useState("")
  const [announceCategoryId, setAnnounceCategoryId] = useState("")
  const Id = useAuthStore((state) => state.id);
  

  useEffect(() => {
    // 서버에서 공지사항 데이터 가져오기
    baseApi.get(`board/announcement/${params.id}`).then((res) => {
      const data = res.data.data;
      setTitle(data.title);
      setContent(data.content)
      setAnnounceId(data.announceId)
      setAnnounceCategoryId(data.announceCategoryId)
    });
  }, [params.id]);

  const moveAnnouncement = () => {
    navigate(`/board/announcement/1`)
  }

  const deleteAnnouncement = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("삭제하시겠습니까?")) {
      baseApi.delete(`/board/announcement/${params.id}`).then((res) => {
        console.log(res);
        navigate(`/board/announcement/1`);
      });
    } else {
      navigate(`/board/announcement/detail/${params.id}`);
    }
  };

  const updateAnnouncement = () => {
    if (isEditing) {
      // 수정 내용 서버에 전송
      baseApi
        .put(`/board/announcement/${params.id}`, { 
          announceId: announceId,
          announceCategoryId: announceCategoryId,
          title: title,
          content: content,
          loginId: Id
         })
        .then((res) => {
          console.log(res);
          setIsEditing(false); // 수정 완료 후 보기 모드로 전환
        })
        .catch((error) => {
          console.error("수정 중 오류 발생:", error);
        });
    } else {
      setIsEditing(true); // 수정 모드로 전환
    }
  };

  return (
    <div>
      <NavbarExample/>
      <div className="container text-start">
        {/* 로고 */}
        <LogoAnnouncement />
        <button className='listbtn mt-4' onClick={moveAnnouncement} style={{border:"none"}}>게시판 목록</button>
        {/* 게시판 제목 및 내용 */}
        {isEditing ? (
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              className="form-control mb-3"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
              className="form-control mb-3"
              rows="10"
            ></textarea>
          </div>
        ) : (
          <div>
            <AnnouncementTitle title={title} />
            <AnnouncementContent content={content} />
          </div>
        )}
        {/* 삭제 수정 버튼 */}
        <div className="row justify-content-evenly">
          <button className="updatebtn" onClick={updateAnnouncement} style={{border:"none"}}>
            {isEditing ? "저장" : "수정"}
          </button>
          <button className="deletebtn" onClick={deleteAnnouncement} style={{border:"none"}}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetail;
