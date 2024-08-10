import "./Chapter2List.css";
import ChapterList from "../../molecules/StudyList/ChapterList";
import Text32 from "../../atoms/Text32";
import { useNavigate } from "react-router-dom";
import BlackBoardTab from "../../molecules/BlackBoardTab";
import { useState } from "react";

function Chapter2List({ content, chapterId }) {
  console.log(content);

  const handleTabClick = (index) => {
    setCurrentTab(index);
  };

  let navigate = useNavigate();
  let [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="Chapter2List">
      {/* 칠판 안 */}
      <div className="Chapter2Content">
        {content.map((item, i) => {
          return (
            <div className="Chapter2Group">
              {/* 칠판 왼쪽 */}
              <div className="Ch2ContentLeft">
                <Text32 text={item.categoryContent} />
              </div>

              {/* 칠판 오른쪽 */}
              <div className="Ch2ContentRight">
                {item.child.map((itemchild) => {
                  return (
                    <div
                      className="Ch2ContentWord"
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

      {/* 칠판 가운데 점선 */}
      <div className="VerticalLine"></div>

      {/* 칠판 */}
      <div className="Chapter1Board">
        <ChapterList title={"Ch2. 한 글자"} />
      </div>
    </div>
  );
}
export default Chapter2List;
