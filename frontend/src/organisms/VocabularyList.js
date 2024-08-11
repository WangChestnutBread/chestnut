import "./VocabularyList.css";
import ChapterList from "../molecules/StudyList/ChapterList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseApi from "../api/fetchAPI";
import Pagenation from "../atoms/Pagenation";
import Text32 from "../atoms/Text32";

function VocabularyList({
  chapterTitle,
  getVocabulary,
  currentVocaItem,
  setCurrentVocaItem,
}) {
  let [currentChapter, setCurrentChapter] = useState(0);
  let [currentVocaPage, setCurrentVocaPage] = useState(1);
  let totalPages = currentVocaItem.totalPages;

  const handleOnVocaClick = (index) => {
    setCurrentChapter(index);
    setCurrentVocaPage(1);
  };

  const handlePageChange = () => {
    getVocabulary(currentChapter, currentVocaPage);
  };

  const handleUpPageChange = () => {
    if (currentVocaPage < totalPages) {
      getVocabulary(currentChapter, currentVocaPage + 1);
    }
  };

  const handleDownPageChange = () => {
    if (currentVocaPage > 1) {
      getVocabulary(currentChapter, currentVocaPage - 1);
    }
  };

  return (
    <div className="VocaList container">
      {/* 칠판 위 드롭다운 버튼 */}

      {/* 칠판 안 */}
      <div className="VocaListContent">
        {currentVocaItem.content.map((item, i) => {
          return (
            <div className="VocaListWord">
              <Text32 text={item.word} />
            </div>
          );
        })}
      </div>

      {/* 칠판 */}
      <ChapterList title={"나의 단어장"} />

      {/* 페이지네이션 */}
      <div className="Chapter5_6Pagenation">
        <Pagenation
          currentPage={currentVocaPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          upPageChange={handleUpPageChange}
          downPageChange={handleDownPageChange}
        />
      </div>
    </div>
  );
}

export default VocabularyList;
