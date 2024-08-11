import "./Chapter4_7List.css";
import ChapterList from "../../molecules/StudyList/ChapterList";
import BlackBoardTab from "../../molecules/BlackBoardTab";
import { useState } from "react";
import Text32 from "../../atoms/Text32";

function Chapter4List({ content }) {
  const handleTabClick = (index) => {
    setCurrentTab(index);
  };

  let [currentTab, setCurrentTab] = useState(0);
  let [currentRule, setCurrentRule] = useState(0);

  return (
    <div className="BlackBoardWithTab">
      <div className="BlackBoardWithLine">
        <div className="BlackBoardBody">
          {/* 칠판 위 탭 버튼 */}
          <div className="TabButton">
            {content.map((item, i) => {
              return (
                <BlackBoardTab
                  key={`${item.categoryContent}-${i}`}
                  tabTitle={item.categoryContent}
                  isActive={currentTab === i}
                  onClick={() => {
                    handleTabClick(i);
                    setCurrentRule(0);
                  }}
                />
              );
            })}
          </div>

          {/* 칠판 안 */}
          <div className="BoardInside">
            {/* 칠판 왼쪽 내용 */}
            <div className="LeftBoardList">
              {content[currentTab].phonology.map((item, i) => {
                return (
                  <div>
                    <div
                      className={`LeftBoardText ${
                        currentRule === i ? "active" : ""
                      }`}
                      onClick={() => {
                        setCurrentRule(i);
                      }}
                    >
                      <Text32 key={item.studyId} text={item.phonologyRule} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 칠판 가운데 점선 */}
            <div className="VerticalLine"></div>

            {/* 칠판 오른쪽 내용 */}
            <div className="RightBoard">
              <p className="RightBoardText">
                {
                  content[currentTab].phonology[currentRule]
                    .phonologyExplanation
                }
              </p>
            </div>
          </div>

          {/* 칠판 */}
          <ChapterList title="Ch4. 음운변동" />
        </div>
      </div>
    </div>
  );
}

export default Chapter4List;
