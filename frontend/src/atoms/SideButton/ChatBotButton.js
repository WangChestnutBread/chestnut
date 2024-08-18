import "./ChatBotButton.css";

function ChatBotButton({restartTutorial}) {
  return (
    <button className="ChatBotButton" onClick={restartTutorial}>
      <img src="/icons/TutorialsBtn.svg"/>
    </button>
  );
}

export default ChatBotButton;