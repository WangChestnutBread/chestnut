import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

const CameraOrganism = () => {
  const webcamRef = useRef(null);

  // const capture = useCallback(() => {
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   console.log(imageSrc);
  // }, [webcamRef]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={600}
        height={356}
      />
      {/* <button onClick={capture}>Capture photo</button> */}
    </div>
  );
};

export default CameraOrganism;
