import "./MainSideButtonGroup.css";
import ChatBotButton from "../../atoms/SideButton/ChatBotButton";
import OpenChatButton from "../../atoms/SideButton/OpenChatButton";


function MainSideButtonGroup({handleOpenChatClick, restartTutorial}) {
  return (
    <div className="MainSideButtonGroup">
      <OpenChatButton handleOpenChatClick={handleOpenChatClick}/>
      <ChatBotButton restartTutorial={restartTutorial}/>
    </div>
  );
}

export default MainSideButtonGroup;