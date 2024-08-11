import "./Chapter5List.css";
import { useState } from "react";
import ChapterList from "../../molecules/StudyList/ChapterList";
import TabDropDown from "../../molecules/TabDropDown";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Text32 from "../../atoms/Text32";

function Chapter5List({ content, chapterId }) {
  let navigate = useNavigate();
  let [currentTopic, setCurrentTopic] = useState(0);
  const handleOnClick = (index) => {
    setCurrentTopic(index);
  };

  return (
    <div className="Chapter5List">
      {/* 칠판 위 드롭다운 버튼 */}
      <Dropdown className="TabDropDownButton">
        <Dropdown.Toggle id="dropdown-basic" className="TabDropDownToggle">
          {content[currentTopic].categoryContent}
        </Dropdown.Toggle>
        <TabDropDown content={content} handleOnClick={handleOnClick} />
      </Dropdown>

      {/* 칠판 안 */}
      <div className="Chapter5Content">
        {content[currentTopic].child.map((itemchild, i) => {
          return (
            <div
              className="Chapter5Word"
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
      <ChapterList title={"Ch5. 단어"} />
    </div>
  );
}
export default Chapter5List;
