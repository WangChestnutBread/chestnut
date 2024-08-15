import React, { useState, useRef, useEffect } from "react";
import "./Record.css";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import baseApi from "../../api/fetchAPI";
import { useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import CustomAlert from "../../atoms/alert";
import Lottie from "lottie-react";
import Save from "../../assets/lottie/record.json";

const RecordForModal = ({ func, func2, studyId }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [wavBlob, setWavBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const ffmpeg = new FFmpeg();
  const navigate = useNavigate();
  const [check, setData] = useState("");
  const setPronunciation = useAuthStore((state) => state.setPronunciation);
  const [alertContent, setAlertContent] = useState("");

  // 녹음 시작/정지 토글
  const handleToggle = async () => {
    if (isRecording) {
      baseApi.get(`/study/detail/${studyId}/word`).then((res) => {
        console.log(res.data.data.word);
        setData(res.data.data.word);
      });

      // 녹음 중지
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      // 녹음 시작
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
          convertToWav(blob); // 녹음이 완료되면 WAV로 변환 및 업로드
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    }
  };

  // webm을 wav로 변환
  const convertToWav = async (webmBlob) => {
    try {
      await ffmpeg.load();
      await ffmpeg.writeFile("input.webm", await fetchFile(webmBlob));
      await ffmpeg.exec(["-i", "input.webm", "output.wav"]);
      const wavData = await ffmpeg.readFile("output.wav");
      const wavBlob = new Blob([wavData.buffer], { type: "audio/wav" });
      setWavBlob(wavBlob);
      handleUpload(wavBlob); // 변환 후 즉시 업로드
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

  // 데이터 서버 전송
  const handleUpload = async (wavBlob) => {
    if (!wavBlob) return;
    console.log(check);
    const formData = new FormData();
    formData.append("word", check); //check로 넣으면 됨
    formData.append("audio", wavBlob, "audio.wav");
    checkWavFile(wavBlob);
    try {
      baseApi
        .post("/study/detail/pronunciation/evaluate", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          // console.log(res.data.data.pronunciation);
          console.log("!@#!@#!@");
          console.log(res.data.data.answerMismatchIndices);
          setPronunciation(res.data.data.pronunciation);
          func(res.data.data.pronunciation);
          func2(res.data.data.isPass, res.data.data.answerMismatchIndices);
        })
        .catch((err) => {
          setAlertContent(`다시 녹음해주시겠어요?`);
          console.log(err);
        });
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    // 초기화
    setAudioBlob(null);
    setWavBlob(null);
  };

  const handleCloseAlert = () => {
    setAlertContent(null); // Alert 닫기
  };

  return (
    <div className="d-flex row justify-content-center">
      <div className="record" style={{justifyContent:"center"}}>
        
        <div >
          {isRecording ? (
            <Lottie
              animationData={Save}
              style={{ width: 50, height: 50 }}
              onClick={handleToggle}
            />
          ) : (
            <img
              src="/image/record.png"
              alt="record"
              className="continue"
              onClick={handleToggle}
            />
          )}
        </div>
       
      </div>

      {wavBlob && (
        <div className="audio-container">
          <h3>Recorded Audio</h3>
          <audio controls src={URL.createObjectURL(wavBlob)}></audio>
          <a href={URL.createObjectURL(wavBlob)} download="audio.wav">
            Download Audio
          </a>
        </div>
      )}
      {alertContent && (
        <CustomAlert content={alertContent} onClose={handleCloseAlert} />
      )}
    </div>
  );
};

export default RecordForModal;
