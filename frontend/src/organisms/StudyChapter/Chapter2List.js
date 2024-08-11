import "./Chapter2List.css";
import ChapterList from "../../molecules/StudyList/ChapterList";
import Text32 from "../../atoms/Text32";
import { useNavigate } from "react-router-dom";
import BlackBoardTab from "../../molecules/BlackBoardTab";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import TabDropDown from "../../molecules/TabDropDown";

function Chapter2List({ content, chapterId }) {
  console.log(content);

  let [currentTopic, setCurrentTopic] = useState(0);

  const handleOnClick = (index) => {
    setCurrentTopic(index);
  };

  let navigate = useNavigate();

  return (
    <div className="Chapter2List">
      {/* 칠판 위 드롭다운 버튼 */}
      <Dropdown className="TabDropDownButton">
        <Dropdown.Toggle id="dropdown-basic" className="TabDropDownToggle">
          {content[currentTopic].categoryContent}
        </Dropdown.Toggle>
        <TabDropDown content={content} handleOnClick={handleOnClick} />
      </Dropdown>

      {/* 칠판 안 */}
      <div className="Chapter2Content">
        {content[currentTopic].child.map((itemchild, i) => {
          return (
            <div
              className="Chapter2Word"
              style={
                itemchild.isPass
                  ? { color: "#74A6FD" }
                  : itemchild.isStudy
                  ? { color: "#CECECE" }
                  : null
              }
              onClick={() => {
                navigate(
                  `/study/detail${chapterId}/${chapterId}/${itemchild.studyId}`
                );
              }}
            >
              {<Text32 text={itemchild.word} />}
            </div>
          );
        })}
      </div>

      {/* 칠판 */}
      <ChapterList title={"Ch2. 한 글자"} />
    </div>
  );
}
export default Chapter2List;
