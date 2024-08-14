import React, { useState, useRef, useEffect } from "react";
import "./Record.css";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import baseApi from "../../api/fetchAPI";
import { useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../stores/authStore";

const Record = ({ func, func2 }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [wavBlob, setWavBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const ffmpeg = new FFmpeg();
  const navigate = useNavigate();
  const { studyId, chapterId } = useParams();
  const [check, setData] = useState("");
  const setPronunciation = useAuthStore((state) => state.setPronunciation);

  const checkPoint = useAuthStore((state) => state.checkPoint);

  // getNextId와 getPrevId 함수 정의
  const getNextId = (currentId) => {
    const index = checkPoint.findIndex((id) => id > currentId);
    return index !== -1 ? checkPoint[index] : null;
  };

  const getPrevId = (currentId) => {
    const index = checkPoint.findIndex((id) => id >= currentId) - 1;
    return index >= 0 ? checkPoint[index] : null;
  };

  const upPage = () => {
    func("녹음된 발음");
    func2([10000]);

    const nextId = getNextId(Number(studyId)); // 다음 ID 가져오기
    if (studyId > 0 && studyId < 40) {
      navigate(`/study/detail1/1/${nextId}`);
      baseApi.get(`/log/study`, {
        params: {
          studyId: nextId,
          isPass: 1,
        },
      });
    } else if (nextId && studyId > 39 && studyId < 439) {
      navigate(`/study/detail2/2/${nextId}`);
    } else if (nextId && studyId > 438 && studyId < 446) {
      navigate(`/study/detail3/3/${nextId}`);
    } else if (nextId && studyId > 445 && studyId < 1381) {
      navigate(`/study/detail5/5/${nextId}`);
    } else if (studyId < 2368) {
      navigate(`/study/detail6/6/${nextId}`);
    } else {
      alert("다음 학습 페이지가 없습니다.");
    }
  };

  const downPage = () => {
    func("녹음된 발음");
    func2([1000000]);

    const prevId = getPrevId(Number(studyId)); // 이전 ID 가져오기
    if (prevId && studyId > 0 && studyId < 42) {
      navigate(`/study/detail1/1/${prevId}`);
      baseApi.get(`/log/study`, {
        params: {
          studyId: prevId,
          isPass: 1,
        },
      });
    } else if (prevId && studyId < 441) {
      navigate(`/study/detail2/2/${prevId}`);
    } else if (prevId && studyId < 448) {
      navigate(`/study/detail3/3/${prevId}`);
      baseApi.get(`/log/study`, {
        params: {
          studyId: prevId,
          isPass: 1,
        },
      });
    } else if (prevId && studyId < 1383) {
      navigate(`/study/detail5/5/${prevId}`);
    } else if (prevId && studyId < 2370) {
      navigate(`/study/detail6/6/${prevId}`);
    } else {
      alert("첫 학습페이지 입니다.");
    }
  };

  // 녹음 시작/정지 토글
  const handleToggle = async () => {
    if (isRecording) {
      baseApi.get(`/study/detail/${studyId}/word`).then((res) => {
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
    formData.append("word", '그러나, 안녕하세요?'); //check로 넣으면 됨
    // formData.append("audio", wavBlob, "audio.wav");
    checkWavFile(wavBlob);
    try {
      baseApi
        .post("/study/detail/pronunciation/evaluate/test/success", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          setPronunciation(res.data.data.pronunciation);
          func(res.data.data.pronunciation);
          func2(res.data.data.answerMismatchIndices);
        })
        .catch((err) => {
          alert("다시 녹음해주시겠어요?");
          console.log(err);
        });
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    // 초기화
    setAudioBlob(null);
    setWavBlob(null);
  };

  return (
    <div className="d-flex row justify-content-center">
      <div className="record">
        <img src="/image/left.png" alt="left" onClick={downPage} />
        <div>
          <img
            src={isRecording ? "/image/stop.png" : "/image/record.png"}
            alt={isRecording ? "stop" : "record"}
            className={isRecording ? "stop" : "continue"}
            onClick={handleToggle}
          />
        </div>
        <img src="/image/right.png" alt="right" onClick={upPage} />
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
    </div>
  );
};

export default Record;
