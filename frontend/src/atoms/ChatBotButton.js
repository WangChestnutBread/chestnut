import "./ChatBotButton.css";

function ChatBotButton({restartTutorial}) {
  return (
    <button className="ChatBotButton" onClick={restartTutorial}>
      <img src="/icons/ChatBotIcon.svg"/>
    </button>
  );
}

export default ChatBotButton;