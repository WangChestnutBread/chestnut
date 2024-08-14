import { useEffect, useState } from "react";
import baseApi from "../api/fetchAPI";
import { useLocation } from "react-router-dom";
import "./BookMarkButton.css"
import CustomAlert from "../atoms/alert";

function BookMarkButton({ studyId, isVocabulary }) {
  console.log("초기 isVocabulary", isVocabulary);
  let [inVoca, setInVoca] = useState(isVocabulary);
  const [alertContent, setAlertContent] = useState("");

  const addVoca = (studyId) => {
    baseApi({
      method: "post",
      url: "/vocabulary",
      data: {
        studyId: studyId,
      },
    })
      .then((res) => {
        console.log("단어장 추가 성공");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 기존에 단어장 추가된 상태인지 확인
  useEffect(() => {
    if (isVocabulary !== undefined) {
      setInVoca(isVocabulary);
    }
  }, [isVocabulary]);

  // 단어장 추가
  useEffect(() => {
    if (inVoca) {
      addVoca(studyId);
    }
  }, [inVoca]);

  const handleCloseAlert = () => {
    setAlertContent(null); // Alert 닫기
  };

  return (
    <div
      className="BookMarkButton"
      onClick={() => {
        if (isVocabulary) {
          setAlertContent(`이미 단어장에 존재하는 단어입니다.`);
        } else {
          setInVoca(true);
          setAlertContent(`단어장에 추가됐습니다.`);
        }
      }}
    >
      {inVoca ? (
        <img src="/icons/BookMark.svg" height="100%" />
      ) : (
        <img src="/icons/EmptyBookMark.svg" height="100%" />
      )}
      {alertContent && 
                <CustomAlert content={alertContent} 
                onClose={handleCloseAlert}
            />}
    </div>
  );
}

export default BookMarkButton;
