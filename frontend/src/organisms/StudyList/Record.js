import "./Record.css";
import { useState } from "react";
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";

const Record = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [showIcons, setShowIcons] = useState(false);

  const handleToggle = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setShowIcons(true);
    }
  };

  return (
    <div className="d-flex row justify-content-center">
      {showIcons && isRecording && (
        <div className="d-flex justify-content-center">
          <FaRegCircleCheck className="icon-check" />
          <FaRegCircleXmark className="icon-xmark" />
        </div>
      )}
      <div className="record">
        <img src="/image/left.png" alt="left" />
        <div>
          <img
            src={isRecording ? "/image/stop.png" : "/image/record.png"}
            alt={isRecording ? "stop" : "record"}
            className={isRecording ? "stop" : "continue"}
            onClick={handleToggle}
          />
        </div>
        <img src="/image/right.png" alt="right" />
      </div>
    </div>
  );
};

export default Record;
