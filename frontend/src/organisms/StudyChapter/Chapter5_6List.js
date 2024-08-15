import "./Chapter5_6List.css";
import { useState } from "react";
import ChapterList from "../../molecules/StudyList/ChapterList";
import Pagenation from "../../atoms/Pagenation";
import TabDropDown from "../../molecules/TabDropDown";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Text32 from "../../atoms/Text32";

function Chapter5_6List({ content, chapterId }) {
  console.log(content[3]);
  let navigate = useNavigate();
  let [currentTopic, setCurrentTopic] = useState(0);
  let [currentPage, setCurrentPage] = useState(1);

  let itemsPerPage = 6; // 페이지당 표시할 항목 수
  {
    if (chapterId == 5) {
     itemsPerPage = 12; 
    }

  }

  const handleOnClick = (index) => {
    setCurrentTopic(index);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = content[currentTopic].child.slice(startIndex, endIndex);
  const totalPages = Math.ceil(content[currentTopic].child.length / itemsPerPage);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleUpPageChange = (currentPage) => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
    }
  };

  const handleDownPageChange = (currentPage) => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="Chapter5_6List">
      {/* 칠판 위 드롭다운 버튼 */}
      <Dropdown className="TabDropDownButton">
        <Dropdown.Toggle id="dropdown-basic" className="TabDropDownToggle">
          {content[currentTopic].categoryContent}
        </Dropdown.Toggle>
        <TabDropDown content={content} handleOnClick={handleOnClick} />
      </Dropdown>

      {/* 칠판 안 */}
      <div className={`Chapter${chapterId}Content`}>
        {currentItems.map((itemchild, i) => {
          return (
            <div
              className={`Chapter${chapterId}Word`}
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
      <ChapterList title={chapterId == 5 ? "Ch5. 단어" : chapterId == 6 ? "Ch6. 문장" : null} />
    
      {/* 페이지네이션 */}
      <div className="Chapter5_6Pagenation">
        <Pagenation currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} upPageChange={handleUpPageChange} downPageChange={handleDownPageChange}/>
      </div>
    </div>
  );
}
export default Chapter5_6List;
