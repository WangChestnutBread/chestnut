import React, { useState, useRef } from "react";
import axios from "axios";
import "./Record.css";
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";
import baseApi from "../../api/fetchAPI";
import { useNavigate, useParams } from "react-router-dom";

const UPLOAD_URL = "https://i11d107.p.ssafy.io/chestnutApi/study/detail/pronounciation/evaluate/";

const Record = () => {
  const [router, setRouter] = useState("")
  const [isRecording, setIsRecording] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [audioURL, setAudioURL] = useState(""); // 녹음된 오디오 URL을 저장할 state
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const navigate = useNavigate()
  const params = useParams()

  console.log(params);

  const upPage = () => {
    navigate(`/study/detail${params.chapterId}/${params.chapterId}/${+params.studyId + 1}`)

  }
  const downPage = () => {
    navigate(`/study/detail${params.chapterId}/${params.chapterId}/${params.studyId - 1}`)
  }

  // 녹음 시작/정지 토글
  const handleToggle = async () => {
    if (isRecording) {
      // 녹음 중지
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setShowIcons(true); // O/X 버튼 표시
    } else {
      // 녹음 시작
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: "audio/m4a" });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioURL(audioUrl);
          audioChunksRef.current = [];
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    }
  };

  // 데이터 서버 전송
  const handleUpload = async () => {
    if (!audioURL) return;

    const audioBlob = await fetch(audioURL).then((response) => response.blob());

    const formData = new FormData();
    formData.append("word", "햄버거");
    formData.append("audio", audioBlob, "싸피.m4a");
    console.log(audioBlob);
    console.log(formData);
    try {
      // const response = await axios.post(UPLOAD_URL, formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      baseApi.post('/study/detail/pronunciation/evaluate',formData
         
      )
      .then((res) => {
        console.log(res);
      })
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    // 초기화
    setShowIcons(false);
    setAudioURL("");
  };

  // 녹음 초기화
  const handleCancel = () => {
    setShowIcons(false);
    setAudioURL("");
  };

  return (
    <div className="d-flex row justify-content-center">
      {showIcons && (
        <div className="d-flex justify-content-center">
          <FaRegCircleCheck className="icon-check" onClick={handleUpload} />
          <FaRegCircleXmark className="icon-xmark" onClick={handleCancel} />
        </div>
      )}
      <div className="record">
        <img src="/image/left.png" alt="left" onClick={downPage}/>
        <div>
          <img
            src={isRecording ? "/image/stop.png" : "/image/record.png"}
            alt={isRecording ? "stop" : "record"}
            className={isRecording ? "stop" : "continue"}
            onClick={handleToggle}
          />
        </div>
        <img src="/image/right.png" alt="right" onClick={upPage}/>
      </div>
      {audioURL && !showIcons && (
        <div className="audio-container">
          <h3>Recorded Audio</h3>
          <audio controls src={audioURL}></audio>
          {/* 파일 다운로드 링크 */}
          <a href={audioURL} download="recording.wav">
            Download Audio
          </a>
        </div>
      )}
    </div>
  );
};

export default Record;
