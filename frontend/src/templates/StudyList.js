import React, { useState, useEffect } from "react";
import NavBar from "../organisms/NavBar";
import "./StudyList.css";
import ChapterMenu from "../atoms/ChapterMenu";
import { useNavigate } from "react-router-dom";
import "./NavbarExample.css";
import StudyBackButton from "../molecules/StudyBackButton";
import ChestNutButton from "../organisms/ChestNutButton";
import useAuthStore from "../stores/authStore";
import axios from "axios";

function StudyList() {
  const navigate = useNavigate();
  const [listdata, setlistData] = useState([]);
  const accessToken = useAuthStore((state) => state.accessToken); // accessToken 가져오기

  useEffect(() => {
    if (!accessToken) {
      // accessToken이 없으면 로그인 페이지로 이동 또는 다른 처리
      navigate('/login'); // 예시: 로그인 페이지로 이동
      return;
    }

    axios
      .get("https://i11d107.p.ssafy.io/chestnutApi/study/chapter", {
        headers: {
          access: accessToken, // accessToken을 헤더에 넣기
        },
      })
      .then((response) => {
        if (response.data.code == 200) {
          setlistData(response.data.data)
        } else if (response.data.code == 801) {
          alert("유효하지 않은 토큰입니다.");
        } else if (response.data.code == 710) {
          alert("DB에 없는 정보입니다.");
        } else if (response.data.code == 299) {
          alert("알 수 없는 오류입니다.");
        }
        console.log(response.data.data[0]);
        console.log(listdata)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [accessToken, navigate]);

  const handleChapterNavigation = (chapter) => {
    navigate(`/chapter${chapter}`);
  };
  console.log(listdata);
  return (
    <div>
      <div>
        <div className="NavbarExample">
          <div className="NavbarButton">
            <div className="LeftButton">
              <StudyBackButton />
              <ChestNutButton />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="titleBox">
          <div className="textBox">
            <div className="titleFont">무엇을 학습할까??</div>
          </div>
          <div className="img-con">
            <img className="imgsqueez" src="/image/squeez.png" alt="squeez" />
          </div>
        </div>
        <div className="chapterlist">
          <div className="chapterTotalBox">
            <div className="chapterinnerbox">
              <div className="group-box">
                <div className="cardgroup">
                    {listdata.slice(0, 4).map((chapter) => (
                        <div className="cardlist" key={chapter.chapterId}>
                          <ChapterMenu
                            title={`CH${chapter.chapterId}. ${chapter.chapterName}`}
                            work={() => handleChapterNavigation(chapter.chapterId)}
                          />
                        </div>
                      ))}
                </div>
              </div>
              <div className="cardgroup-sec">
                <div className="group-box">
                    {listdata.slice(4).map((chapter) => (
                        <div className="cardlist" key={chapter.chapterId}>
                          <ChapterMenu
                            title={`CH${chapter.chapterId}. ${chapter.chapterName}`}
                            work={() => handleChapterNavigation(chapter.chapterId)}
                          />
                        </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyList;
