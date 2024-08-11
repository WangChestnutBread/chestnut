import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseApi from "../api/fetchAPI";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";
import StudyBackButton from "../molecules/StudyBackButton";
import ChestNutButton from "../organisms/ChestNutButton";

const Ai = ({ userId }) => {
  const [messages, setMessages] = useState([]); // 대화 메시지 상태
  const [isRecording, setIsRecording] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [max, setMax] = useState(0); // 누적된 숫자 값을 저장할 상태
  const [audioBlob, setAudioBlob] = useState(null);
  const [wavBlob, setWavBlob] = useState(null);
  const [show, setShow] = useState(false)
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const ffmpeg = new FFmpeg();
  const navigate = useNavigate();


  useEffect(() => {
    const startConversation = async () => {
      try {
        const response = await baseApi.get("/conversation/start");
        console.log(response);
        if (response.status !== 200) {
          throw new Error("Failed to start conversation");
        }
        sessionStorage.setItem("isNewConversation", "false");
      } catch (error) {
        console.error("Error starting conversation:", error);
      }
    };

    const checkIfNewConversation = async () => {
      await startConversation();
    };

    checkIfNewConversation();

    const handleBeforeUnload = () => {
      sessionStorage.removeItem("isNewConversation");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [userId, navigate]);

  const handleToggle = async () => {
    if (isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setShowIcons(true);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        mediaRecorderRef.current = new MediaRecorder(stream, {
          mimeType: "audio/webm",
        });
        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          setAudioBlob(blob);
          audioChunksRef.current = [];
          convertToWav(blob);
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    }
  };

  const convertToWav = async (webmBlob) => {
    try {
      await ffmpeg.load();
      await ffmpeg.writeFile("input.webm", await fetchFile(webmBlob));
      await ffmpeg.exec(["-i", "input.webm", "output.wav"]);
      const wavData = await ffmpeg.readFile("output.wav");
      const wavBlob = new Blob([wavData.buffer], { type: "audio/wav" });
      setWavBlob(wavBlob);
    } catch (error) {
      console.error("Error converting to WAV:", error);
    }
  };

  const checkWavFile = (blob) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const riff = String.fromCharCode(...data.slice(0, 4));
      const wave = String.fromCharCode(...data.slice(8, 12));

      if (riff === "RIFF" && wave === "WAVE") {
        console.log("Valid WAV file");
      } else {
        console.error("Invalid WAV file");
      }
    };
    reader.readAsArrayBuffer(blob);
  };

  const handleUpload = async () => {
    if (!wavBlob) return;

    const formData = new FormData();
    formData.append("audio", wavBlob, "audio.wav");

    checkWavFile(wavBlob);

    try {
      const response = await baseApi.post("/conversation/message", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);
      const data = await response.data;

      // 새로운 메시지를 생성
      const newMessages = data.data.messages.map((msg) => {
        const contentParts = msg.content.split("0");
        const numericValue = parseFloat("0" + contentParts[1]);
        console.log(contentParts[1]);
        return {
          role: msg.role === "user" ? "You" : "AI",
          content: contentParts[0],
          numericValue: numericValue, // 숫자 값을 추가
        };
      });
      console.log(newMessages);
      // 새로운 max 값을 계산하여 누적
      let newMax = max;
      newMessages.forEach((msg) => {
        newMax += msg.numericValue;
      });

      if(newMax > 2 && show ===false) {
        alert('토큰 만료가 얼마남지 않았습니다. 곧 대화내용이 초기화 됩니다.')
        setShow(true)
      }

      // max 값이 3을 초과하면 대화를 초기화
      console.log(newMax);
      if (newMax > 3) {
        setMessages([]);
        setMax(0);
        setShow(false)
      } else {
        setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        setMax(newMax);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("다시 시도해 주세요.");
    }

    setShowIcons(false);
    setAudioBlob(null);
    setWavBlob(null);
  };

  const handleCancel = () => {
    setShowIcons(false);
    setAudioBlob(null);
    setWavBlob(null);
  };

  return (
    <div>
      {/* nav바 */}
      <div className="NavbarExample">
        <div className="NavbarButton">
          <div className="LeftButton">
            <StudyBackButton />
            <ChestNutButton />
          </div>
        </div>
      </div>
      {/* 로고 */}
      <div className="container text-start justify-center">
        <div className="logo-container">
          <div className="position-relative">
            <img src="/image/Logo.png" alt="밤빵" className="logo" />
            <span className="qna position-absolute bottom-0 start-100">Ai</span>
          </div>
        </div>
      </div>

      {/* 메시지 표시 */}
      <div
        className="messages-container mt-5"
        style={{
          padding: "20px",
          maxHeight: "1000px",
          overflowY: "scroll",
          backgroundColor: "#DCB78F",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.role === "You" ? "user-msg" : "assistant-msg"}
            style={{
              display: "inline-block",
              backgroundColor: msg.role === "You" ? "#6B3906" : "#6B3906",
              padding: "10px",
              borderRadius: "10px",
              marginBottom: "10px",
              textAlign: msg.role === "You" ? "left" : "right",
              alignSelf: index % 2 === 0 ? "flex-end" : "flex-start",
              clear: "both",
              float: index % 2 === 0 ? "right" : "left",
              maxWidth: "60%",
              fontSize: "35px",
              color: "white",
            }}
          >
            <strong>{msg.role}:</strong> {msg.content}
          </div>
        ))}
      </div>

      {/* 녹음버튼 */}
      <div
        className="d-flex row justify-content-center"
        style={{
          position: "fixed",
          bottom: "100px",
          left: "46.5%",
        }}
      >
        {showIcons && (
          <div className="d-flex justify-content-center">
            <FaRegCircleCheck className="icon-check" onClick={handleUpload} />
            <FaRegCircleXmark className="icon-xmark" onClick={handleCancel} />
          </div>
        )}

        <div
          className="record justify-content-center"
          style={{
            position: "fixed",
            bottom: "20px", // 화면 하단에서 20px 위에 위치
            left: "50%", // 화면의 가로 중앙에 위치
            transform: "translateX(-50%)", // 가로 중앙 정렬을 위해 사용
            display: "flex",
            alignItems: "center",
          }}
        >
          <div>
            <img
              src={isRecording ? "/image/stop.png" : "/image/record.png"}
              alt={isRecording ? "stop" : "record"}
              className={isRecording ? "stop" : "continue"}
              onClick={handleToggle}
            />
          </div>
        </div>

        {wavBlob && !showIcons && (
          <div className="audio-container">
            <h3>Recorded Audio</h3>
            <audio controls src={URL.createObjectURL(wavBlob)}></audio>
            <a href={URL.createObjectURL(wavBlob)} download="audio.wav">
              Download Audio
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ai;
