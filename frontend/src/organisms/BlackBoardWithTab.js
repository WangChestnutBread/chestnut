import "./BlackBoardWithTab.css";
import ChapterList from "../molecules/StudyList/ChapterList";
import BlackBoardTab from "../molecules/BlackBoardTab";
import { useState } from "react";

function BlackBoardWithTab({ content }) {
    let [currentTab, setCurrentTab] = useState(0)

    const handleTabClick = (index) => {
      setCurrentTab(index)
    }


  return (
    <div className="container BlackBoardWithTab">
      <div className="BlackBoardWithLine">
        <div className="BlackBoardBody">
          <ChapterList title="Ch4. 음운변동" />
          <div className="TabButton">
            {content.map((item, i) => {
              return <BlackBoardTab key={i} tabTitle={item.categoryContent} isActive={currentTab === i} onClick={()=>{handleTabClick(i)}}/>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlackBoardWithTab;
