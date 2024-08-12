import { useState } from "react";
import MainMenu from "../organisms/Main/MainMenu";
import "./MainTemplate.css";
import LastStudy from "../organisms/Main/LastStudy";
import MainProfile from "../organisms/Main/MainProfile";
import MainCalendar from "../organisms/Main/MainCalendar";
import MainSideButtonGroup from "../molecules/Main/MainSideButtonGroup";
import OpenChat from "../pages/OpenChat";
import { Modal } from "react-bootstrap";

const MainTemplate = ({ profile, attendance }) => {
  // 메뉴 밤
  let [menu, setMenu] = useState([
    { name: "학습", path: "/study" },
    { name: "대화연습", path: "/ai" },
    { name: "단어장", path: "/myVocabulary" },
    { name: "게시판", path: "/board/announcement/1" },
  ]);

  let [showOpenChat, setShowOpenChat] = useState(false);

  const handleOpenChatClick = () => {
    setShowOpenChat(!showOpenChat);
  };

  return (
    <div>
      <div className="MainTemplate container">
        {/* 메인 로고 */}
        <div className="Logo">
          <img src="/image/Logo.png" className="LogoImage" />
        </div>

        {/* 밤 메뉴 */}
        <MainMenu menu={menu} />

        <div className="MainStatus">
          {/* 프로필 */}
          <MainProfile profile={profile} />

          {/* 마지막 학습 */}
          <LastStudy
            chapter={profile.chapterName}
            word={profile.word}
            chapterId={profile.chapterId}
            studyId={profile.studyId}
          />
        </div>

        {/* 출석 캘린더 */}
        <MainCalendar attendance={attendance.attendanceAt} />
      </div>

      {/* 오픈 채팅 모달 */}
      {showOpenChat && <div className="MainOpenChat"><OpenChat/></div>}

      {/* 사이드 버튼 모음 */}
      <MainSideButtonGroup handleOpenChatClick={handleOpenChatClick} />

    </div>
  );
};

export default MainTemplate;
