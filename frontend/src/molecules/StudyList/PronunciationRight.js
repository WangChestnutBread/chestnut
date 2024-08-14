import "./PronunciationRight.css";
import React, { useState } from "react";
import Text64 from "../../atoms/Text64";
import CustomAlert from "../../atoms/alert";

const PronunciationRight = ({data, location}) => {
  const [alertContent, setAlertContent] = useState("");

  console.log(data);
  console.log(location);
  if (data === undefined) {
    setAlertContent(`다시 말씀해주십시오.`);
  }

    const handleCloseAlert = () => {
    setAlertContent(null); // Alert 닫기
  };

  return (
    <div className="right d-flex justify-content-center align-items-center text-center rounded-end">
      <Text64 text={data} location={location} />
      {alertContent && 
                <CustomAlert content={alertContent} 
                onClose={handleCloseAlert}
            />}
    </div>
  );
};

export default PronunciationRight;
