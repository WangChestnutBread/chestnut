import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseApi from "../api/fetchAPI";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import StudyBackButton from "../molecules/StudyBackButton";
import ChestNutButton from "../organisms/ChestNutButton";

const Ai = ({ userId }) => {
  const [messages, setMessages] = useState([]); // 대화 메시지 상태
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [wavBlob, setWavBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const ffmpeg = new FFmpeg();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const startConversation = async () => {
      try {
        const response = await baseApi.get("/conversation/start");
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // 메시지가 업데이트될 때마다 호출

  const scrollToBottom = () => {
    const container = messagesEndRef.current?.parentNode;
    if (container) {
      container.scrollTo(0, container.scrollHeight);
    }
  };

  const handleToggle = async () => {
    if (isRecording) {
      mediaRecorderRef.current.stop(); // 녹음 중지 시 녹음을 전송합니다.
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
      handleUpload(wavBlob); // WAV 파일로 변환 후 바로 업로드합니다.
    } catch (error) {
      console.error("Error converting to WAV:", error);
    }
  };

  const handleUpload = async (wavBlob) => {
    if (!wavBlob) return;

    const formData = new FormData();
    formData.append("audio", wavBlob, "audio.wav");

    try {
      const response = await baseApi.post("/conversation/message", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = await response.data;

      // 새로운 메시지를 생성
      const newMessages = data.data.messages.map((msg) => {
        const contentParts = msg.content.split("0");

        return {
          role: msg.role === "user" ? "" : "심심이",
          content: contentParts[0],
        };
      });

      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("다시 시도해 주세요.");
    }

    setAudioBlob(null);
    setWavBlob(null);
    setIsRecording(false); // 녹음 완료 후 녹음 상태 해제
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
            <img src="/image/Logo.png" alt="밤빵" className="logo" style={{ width: "300px" }} />
            <span className="qna position-absolute bottom-0 start-100">
              AI대화
            </span>
          </div>
        </div>
      </div>

      {/* 메시지 표시 */}
      <div
        className="messages-container mt-5"
        style={{
          padding: "20px",
          maxHeight: "500px",
          overflowY: "auto",  // 스크롤이 가능하도록 설정
          backgroundColor: "#fff9ef",
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
              maxWidth: "60%", // 박스의 최대 너비를 설정하여 가로로 길어지는 것을 방지
              fontSize: "20px",
              color: "white",
              minHeight: "50px", // 최소 높이 설정
              height: "auto", // 높이가 내용에 따라 자동으로 조정되도록 설정
              wordBreak: "break-word", // 단어가 길어지면 강제로 줄바꿈
              whiteSpace: "normal", // 텍스트가 박스 너비를 초과하면 줄바꿈
            }}
          >
            {msg.role === "심심이" ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="/image/aistudy.png"
                  alt="심심이"
                  style={{ width: "30px", height: "30px", marginRight: "10px" }}
                />
                <strong>{msg.content}</strong>
              </div>
            ) : (
              <strong>{msg.content}</strong>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* 스크롤을 맞추기 위한 div */}
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
      </div>
    </div>
  );
};

export default Ai;
