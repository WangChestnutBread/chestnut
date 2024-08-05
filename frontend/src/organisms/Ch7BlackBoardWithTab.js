import "./BlackBoardWithTab.css";
import ChapterList from "../molecules/StudyList/ChapterList";
import BlackBoardTab from "../molecules/BlackBoardTab";
import { useState } from "react";
import Text32 from "../atoms/Text32";

function Ch7BlackBoardWithTab({ content }) {
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
                  key={`${item.parentCategory}-${i}`}
                  tabTitle={item.parentCategory}
                  isActive={currentTab === i}
                  onClick={() => {
                    handleTabClick(i);
                    setCurrentRule(0)
                  }}
                />
              );
            })}
          </div>

          {/* 칠판 안 */}
          <div className="BoardInside">
            
            {/* 칠판 왼쪽 내용 */}
            <div className="LeftBoardList">
              {content[currentTab].childCategory.map((item, i) => {
                return (
                  <div key={`${item.categoryContent}-${i}`}>
                    <div
                      className={`LeftBoardText ${
                        currentRule === i ? "active" : ""
                      }`}
                      onClick={() => {
                        setCurrentRule(i);
                      }}
                    >
                      <Text32 text={item.categoryContent} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 칠판 가운데 점선 */}
            <div className="VerticalLine"></div>

            {/* 칠판 오른쪽 내용 */}
            <div className="RightBoard">
              {content[currentTab].childCategory[
                currentRule
              ].grandChildCategory.map((item, i) => {})}
            </div>
          </div>

          {/* 칠판 */}
          <ChapterList title="Ch7. 헷갈리는 발음" />
        </div>
      </div>
    </div>
  );
}

export default Ch7BlackBoardWithTab;
