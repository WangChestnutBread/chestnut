import { useEffect, useState } from "react";
import MainMenu from "../organisms/Main/MainMenu";
import "./MainTemplate.css";
import LastStudy from "../organisms/Main/LastStudy";
import MainProfile from "../organisms/Main/MainProfile";
import MainCalendar from "../organisms/Main/MainCalendar";
import Tutorial from "../atoms/Tutorial";
import MainTutorialStep from "../data/MainTutorialStep";
import WelcomeModal from "../atoms/WelcomeModal";
import { Row } from "react-bootstrap";
import SideButtonWithModal from "../organisms/SideButtonWithModal";

const MainTemplate = ({ profile, attendance }) => {
  // 메뉴 밤
  let [menu, setMenu] = useState([
    { name: "학습", path: "/study" },
    { name: "대화연습", path: "/ai" },
    { name: "단어장", path: "/myVocabulary" },
    { name: "게시판", path: "/board/announcement/1" },
  ]);

  let [showOpenChat, setShowOpenChat] = useState(false);
  let [startTutorial, setStartTutorial] = useState(false);
  let [welcomeModal, setWelcomeModal] = useState(false);

  //튜토리얼은 학습 기록이 없을 때 한 번만
  useEffect(() => {
    if (profile.word === null) {
      setWelcomeModal(true);
    } else {
      setWelcomeModal(false);
    }
  }, []);

  // 오픈 채팅 모달 열기
  const handleOpenChatClick = () => {
    setShowOpenChat(!showOpenChat);
  };

  // 웰컴 모달 닫기
  const handleCloseModal = () => {
    setWelcomeModal(false);
  };

  // 튜토리얼 시작
  const handleStartTutorial = () => {
    setStartTutorial(true);
    handleCloseModal();
  };

  // 튜토리얼 재시작
  const restartTutorial = () => {
    setStartTutorial(false);
    setTimeout(() => {
      setStartTutorial(true);
    }, 0); // 0ms 지연 후 상태를 true로 설정
  };

  // 튜토리얼 완료 시 상태 초기화
  const handleTutorialComplete = () => {
    setStartTutorial(false);
  };

  return (
    <div>
      {/* 웰컴 모달 */}
      {welcomeModal && (
        <WelcomeModal
          onClose={handleCloseModal}
          handleStartTutorial={handleStartTutorial}
        />
      )}

      {/* 튜토리얼 */}
      <Tutorial
        steps={MainTutorialStep}
        startTutorial={startTutorial}
        onComplete={handleTutorialComplete}
      />

      <div className="MainTemplate container">
        {/* 메인 로고 */}
        <div className="Logo">
          <img src="/image/Logo.png" className="LogoImage" alt="Logo" />
        </div>

        {/* 밤 메뉴 */}
        <MainMenu menu={menu} />

        <Row className="MainStatus container">
          {/* 프로필 */}
          <MainProfile profile={profile} />

          {/* 마지막 학습 */}
          <LastStudy
            chapter={profile.chapterName}
            word={profile.word}
            chapterId={profile.chapterId}
            studyId={profile.studyId}
          />
        </Row>

        {/* 출석 캘린더 */}
        <MainCalendar attendance={attendance.attendanceAt} />
      </div>

      {/* 사이드바 */}
      <SideButtonWithModal
        showOpenChat={showOpenChat}
        handleOpenChatClick={handleOpenChatClick}
        restartTutorial={restartTutorial}
      />
    </div>
  );
};

export default MainTemplate;
