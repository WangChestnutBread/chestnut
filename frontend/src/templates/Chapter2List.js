import "./Chapter2List.css";
import ChapterList from "../molecules/StudyList/ChapterList";
import Text32 from "../atoms/Text32";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import BlackBoardDropDown from "../molecules/BlackBoardDropDown";

function Chapter2List({ content, chapterId }) {
  console.log(content)
  let navigate = useNavigate();
  let [showMenu, setShowMenu] = useState(false);
  let [currentTab, setCurrentTab] = useState(0);

  const handleTabClick = (index) => {
    setCurrentTab(index);
  };

  return (
    <div className="Chapter2List">
      {/* 칠판 위 탭 버튼 */}
      {/* <button onClick={setShowMenu(!showMenu)}>
        {
          showMenu ? <BlackBoardDropDown chapterTitle={content} /> : null
        }
      </button> */}

      {/* 칠판 안 */}
      <div className="Chapter1Content">
        {content.map((item, i) => {
          return (
            <div className="Chapter1Group">

              {/* 자음/모음 내용 */}
              <div className="ContentBox">
                {item.child.map((itemchild) => {
                  return (
                    <div
                      className="ContentWord"
                      style={itemchild.isStudy ? { color: "#74A6FD" } : null}
                      onClick={() => {
                        navigate(
                          `/study/detail${chapterId}/${chapterId}/${itemchild.studyId}`
                        );
                      }}
                    >
                      <Text32 text={itemchild.word} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* 칠판 */}
      <div className="Chapter1Board">
        <ChapterList title={"Ch1. 자음/모음"} />
      </div>
    </div>
  );
}
export default Chapter2List;
