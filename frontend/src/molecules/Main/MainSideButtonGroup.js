import "./MainSideButtonGroup.css";
import ChatBotButton from "../../atoms/ChatBotButton";
import OpenChatButton from "../../atoms/OpenChatButton";


function MainSideButtonGroup() {
  return (
    <div className="MainSideButtonGroup">
      <OpenChatButton />
      <ChatBotButton />
    </div>
  );
}

export default MainSideButtonGroup;