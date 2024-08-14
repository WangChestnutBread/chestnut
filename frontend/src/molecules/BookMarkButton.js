import { useEffect, useState } from "react";
import "./BookMarkButton.css";
import baseApi from "../api/fetchAPI";
import { useLocation } from "react-router-dom";

function BookMarkButton({ studyId, isVocabulary }) {
  console.log("초기 isVocabulary", isVocabulary);
  let [inVoca, setInVoca] = useState(isVocabulary);

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

  return (
    <div
      className="BookMarkButton"
      onClick={() => {
        if (isVocabulary) {
          window.alert("이미 단어장에 존재하는 단어입니다.");
        } else {
          setInVoca(true);
          window.alert("단어장에 추가되었습니다.");
        }
      }}
    >
      {inVoca ? (
        <img src="/icons/BookMark.svg" height="100%" />
      ) : (
        <img src="/icons/EmptyBookMark.svg" height="100%" />
      )}
    </div>
  );
}

export default BookMarkButton;
