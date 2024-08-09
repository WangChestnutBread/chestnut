import "./VocabularyList.css";
import ChapterList from "../molecules/StudyList/ChapterList";
import BlackBoardTab from "../molecules/BlackBoardTab";
import { useEffect, useState } from "react";
import BlackBoardTabDropDown from "../molecules/BlackBoardTabDropDown";
import Text24 from "../atoms/Text24";
import { ListGroup } from "react-bootstrap";

function VocabularyList({ chapterTitle, content }) {
  const handleTabClick = (index) => {
    setCurrentTab(index);
  };

  let [currentTab, setCurrentTab] = useState(0);
  // console.log(content)

  return (
    <div className="BlackBoardWithTab">
      <div className="BlackBoardWithLine">
        <div className="BlackBoardBody">
          {/* 칠판 위 탭 버튼 */}
          <BlackBoardTabDropDown chapterTitle={chapterTitle} />

          {/* 칠판 */}
          <div className="B">
            <ChapterList title="나의 단어장" />
          </div>

          {/* 칠판 안 */}
          <div className="BoardInside">
            {/* 칠판 내용 */}
            <ListGroup variant="flush" className="BoardList">
              {content.map((item) => {
                return (<ListGroup.Item>{item.word}</ListGroup.Item>)
              })}  
            </ListGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VocabularyList;
