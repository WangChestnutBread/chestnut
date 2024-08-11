import "./StudyList.css";
import baseApi from "../api/fetchAPI";
import ChapterMenu from "../atoms/ChapterMenu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavbarExample.css";
import StudyBackButton from "../molecules/StudyBackButton";
import ChestNutButton from "../organisms/ChestNutButton";
import Text32 from "../atoms/Text32";

function StudyList() {
  const navigate = useNavigate();
  const [listdata, setlistData] = useState([]);
  
  useEffect(() => {
    // if (!accessToken) {
    //   // accessToken이 없으면 로그인 페이지로 이동 또는 다른 처리
    //   navigate('/login'); // 예시: 로그인 페이지로 이동
    //   return;
    // }
    baseApi({
      method: "get",
      url: "/study/chapter",
    }) 
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  const handleChapterNavigation = (chapter) => {
    navigate(`/chapter/${chapter}`);
  };

  return (
    <div>
      {/* navbar */}
        <div className="NavbarExample">
          <div className="NavbarButton">
            <div className="LeftButton">
              <StudyBackButton />
              <ChestNutButton />
            </div>
          </div>
        </div>
      
      <div className="container">
        {/* 제목 */}
        <div className="titleBox">
          <Text32 text={"무엇을 학습할까?"}/>
        </div>

        챕터 리스트        
        {/* <div className="chapterlist">
          <div className="chapterTotalBox">
            <div className="chapterinnerbox"> */}
              {/* <div className="group-box">
                <div className="cardgroup">
                    {listdata.map((chapter) => (
                        <div className="cardlist" key={chapter.chapterId}>
                          <ChapterMenu
                            title={`CH${chapter.chapterId}. ${chapter.chapterName}`}
                            work={() => handleChapterNavigation(chapter.chapterId)}
                          />
                        </div>
                      ))}
                </div>
              </div> */}
              <div className="cardgroup-sec">
                {/* <div className="group-box">
                    {listdata.slice(4).map((chapter) => (
                        <div className="cardlist" key={chapter.chapterId}>
                          <ChapterMenu
                            title={`CH${chapter.chapterId}. ${chapter.chapterName}`}
                            work={() => handleChapterNavigation(chapter.chapterId)}
                            chapterId={chapter.chapterId}
                          />
                        </div>
                    ))}
                </div> */}
              {/* </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default StudyList;
