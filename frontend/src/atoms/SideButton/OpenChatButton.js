import { useState } from "react";
import "./OpenChatButton.css"

function OpenChatButton({handleOpenChatClick}) {

  return (
    <button className="OpenChatButton" onClick={handleOpenChatClick}>
      <img src="/icons/OpenChatIcon.svg"/>
    </button>
  );
}

export default OpenChatButton;
