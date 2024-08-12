import "./MainSideButtonGroup.css";
import ChatBotButton from "../../atoms/ChatBotButton";
import OpenChatButton from "../../atoms/OpenChatButton";


function MainSideButtonGroup({handleOpenChatClick}) {
  return (
    <div className="MainSideButtonGroup">
      <OpenChatButton handleOpenChatClick={handleOpenChatClick}/>
      <ChatBotButton />
    </div>
  );
}

export default MainSideButtonGroup;