import "./ChapterMainTemplate.css";
import ChapterCard from "../../organisms/ChapterList/ChapterCard";
import "../NavbarExample.css";
import Text32 from "../../atoms/Text32";
import { Row, Col } from "react-bootstrap";
import NavbarExample from "../NavbarExample";
import Tutorial from "../../atoms/Tutorial";
import ChapterMainTutorialStep from "../../data/ChapterMainTutorialStep";
import { useState } from "react";
import SideButtonWithModal from "../../organisms/SideButton/SideButtonWithModal";

function ChapterMainTemplate({ listdata }) {
  let [showOpenChat, setShowOpenChat] = useState(false);
  let [startTutorial, setStartTutorial] = useState(false);

  // 오픈 채팅 모달 열기
  const handleOpenChatClick = () => {
    setShowOpenChat(!showOpenChat);
  };

  // 튜토리얼 재시작
  const restartTutorial = () => {
    setStartTutorial(false);
    setTimeout(() => {
      setStartTutorial(true);
    }, 0); // 0ms 지연 후 상태를 true로 설정
  };

  return (
    <div>
      <NavbarExample />

      {/* 튜토리얼 */}
      <Tutorial steps={ChapterMainTutorialStep} startTutorial={startTutorial} />

      {/* 챕터 카드 목록 */}
      <div className="container">
        {/* 제목 */}
        <div className="titleBox">
          <Text32 text={"무엇을 학습할까?"} />
        </div>

        {/* 카드 목록 */}
        <Row xs={2} md={3} lg={4} className="g-4 ChapterCardList">
          {listdata.map((item, i) => (
            <Col key={i} className="ChapterCardFirstLine">
              <ChapterCard content={item} />
            </Col>
          ))}
        </Row>
      </div>

      {/* 사이드바 */}
      <SideButtonWithModal
        showOpenChat={showOpenChat}
        handleOpenChatClick={handleOpenChatClick}
        restartTutorial={restartTutorial}
      />
    </div>
  );
}

export default ChapterMainTemplate;
