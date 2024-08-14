import "./MainSideButtonGroup.css";
import ChatBotButton from "../../atoms/ChatBotButton";
import OpenChatButton from "../../atoms/OpenChatButton";


function MainSideButtonGroup({handleOpenChatClick, restartTutorial}) {
  return (
    <div className="MainSideButtonGroup">
      <OpenChatButton handleOpenChatClick={handleOpenChatClick}/>
      <ChatBotButton restartTutorial={restartTutorial}/>
    </div>
  );
}

export default MainSideButtonGroup;