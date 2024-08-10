import "./Chapter5List.css";
import { useState } from "react";
import ChapterList from "../../molecules/StudyList/ChapterList";
import TabDropDown from "../../molecules/TabDropDown";
import { Dropdown } from "react-bootstrap";
function Chapter5List({ content, chapterId }) {
  console.log(content);
  let [currentTopic, setCurrentTopic] = useState(content[0].categoryContent);


  const handleOnClick = (event) => {
    setCurrentTopic(event.target.innerText);
  };
  
  return (
    <div className="Chapter5List">
      {/* 칠판 위 드롭다운 버튼 */}
      <Dropdown className="TabDropDownButton">
        <Dropdown.Toggle id="dropdown-basic" className="TabDropDownToggle">
          {currentTopic}
        </Dropdown.Toggle>
        <TabDropDown content={content} handleOnClick={handleOnClick} />
      </Dropdown>

      {/* 칠판 */}
      <ChapterList title={"Ch5. 단어"} />
    </div>
  );
}
export default Chapter5List;
