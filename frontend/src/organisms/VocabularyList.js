import "./VocabularyList.css"
import ChapterList from "../molecules/StudyList/ChapterList";
import BlackBoardTab from "../molecules/BlackBoardTab";
import { useEffect, useState } from "react";
import BlackBoardTabDropDown from "../molecules/BlackBoardTabDropDown";

function VocabularyList({ chapterTitle, content }) {
  const handleTabClick = (index) => {
    setCurrentTab(index);
  };

  let [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="BlackBoardWithTab">
      <div className="BlackBoardWithLine">
        <div className="BlackBoardBody">
          {/* 칠판 위 탭 버튼 */}
          <BlackBoardTabDropDown chapterTitle={chapterTitle}/>

          {/* 칠판 */}
          <div className="B">
            <ChapterList title="나의 단어장" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VocabularyList;
