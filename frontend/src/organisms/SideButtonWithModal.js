import MainSideButtonGroup from "../molecules/Main/MainSideButtonGroup";
import OpenChat from "./OpenChat";

function SideButtonWithModal({showOpenChat, handleOpenChatClick, restartTutorial}) {
  return (
    <div>
      {/* 오픈 채팅 모달 */}
      {showOpenChat && (
        <div className="MainOpenChat">
          <OpenChat />
        </div>
      )}

      {/* 사이드바 */}
      <MainSideButtonGroup
        handleOpenChatClick={handleOpenChatClick}
        restartTutorial={restartTutorial}
      />
    </div>
  );
}

export default SideButtonWithModal;
