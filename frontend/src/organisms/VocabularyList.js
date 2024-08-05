import ChapterList from "../molecules/StudyList/ChapterList";
import BlackBoardTab from "../molecules/BlackBoardTab";
import { useState } from "react";

function VocabularyList({ content }) {
  const handleTabClick = (index) => {
    setCurrentTab(index);
  };

  let [currentTab, setCurrentTab] = useState(0);

  return (
    <div>
      {/* 칠판 위 탭 버튼 */}
      
      {/* 칠판 */}
      <ChapterList title="나의 단어장" />
    </div>
  );
}

export default VocabularyList;
