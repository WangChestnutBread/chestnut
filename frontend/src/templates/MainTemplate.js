import { useEffect, useState } from "react";
import useAuthStore from "../stores/authStore";
import MainMenu from "../organisms/Main/MainMenu";
import "./MainTemplate.css";
import LastStudy from "../organisms/Main/LastStudy";
import MainProfile from "../organisms/Main/MainProfile";
import MainCalendar from "../organisms/Main/MainCalendar";
import MainSideButtonGroup from "../molecules/Main/MainSideButtonGroup";
import OpenChat from "../organisms/OpenChat";
import Tutorial from "../atoms/Tutorial";
import MainTutorialStep from "../data/MainTutorialStep";
import WelcomeModal from "../atoms/WelcomeModal";
import baseApi from "../api/fetchAPI";



const MainTemplate = ({ profile, attendance }) => {
  // 메뉴 밤
  let [menu, setMenu] = useState([
    { name: "학습", path: "/study" },
    { name: "대화연습", path: "/ai" },
    { name: "단어장", path: "/myVocabulary" },
    { name: "게시판", path: "/board/announcement/1" },
  ]);


  const { hasVisitedBefore, setHasVisitedBefore } = useAuthStore();

  let [showOpenChat, setShowOpenChat] = useState(false);
  let [startTutorial, setStartTutorial] = useState(false);
  let [welcomeModal, setWelcomeModal] = useState(false);

  // 상태 초기화 -> 누르면 초기화는 되는데 무한 랜더링함...
  //   const resetHasVisitedBefore = useAuthStore((state) => state.resetHasVisitedBefore);
  //   resetHasVisitedBefore();

  //튜토리얼은 최초 접속했을 때 한 번만
  useEffect(() => {
    // console.log("useEffect 실행됨");
    console.log("welcomeModal :", welcomeModal);
    console.log("hasVisitedBefore : ", hasVisitedBefore);
    if (!hasVisitedBefore) {
      setHasVisitedBefore(true);
      // console.log("hasVisitedBefore가 false였으므로, welcomeModal을 true로 설정");
      setWelcomeModal(true);
      // console.log("모달이 트루로 설정됨");
    } else {
      // console.log("hasVisitedBefore가 true임");
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
      {showOpenChat && (
        <div className="MainOpenChat">
          <OpenChat />
        </div>
      )}

      {/* 사이드 버튼 모음 */}
      <MainSideButtonGroup
        handleOpenChatClick={handleOpenChatClick}
        restartTutorial={restartTutorial}
      />
    </div>
  );
};

export default MainTemplate;
