import "./VocabularyList.css";
import "./VocaModal.css";
import ChapterList from "../molecules/StudyList/ChapterList";
import { useEffect, useState } from "react";
import Pagenation from "../atoms/Pagenation";
import Text32 from "../atoms/Text32";
import { Dropdown } from "react-bootstrap";
import VocaTabDropDown from "../molecules/VocaTabDropDown";
import VocaModal from "./VocaModal";
import baseApi from "../api/fetchAPI";

function VocabularyList({ chapterTitle, getVocabulary, currentVocaItem }) {
  const modifiedChapterTitle = [...chapterTitle];
  modifiedChapterTitle.unshift({ chapterId: 0, chapterName: "전체" });

  let [currentChapter, setCurrentChapter] = useState(0);
  let [currentVocaPage, setCurrentVocaPage] = useState(1);
  let totalPages = currentVocaItem.totalPages;

  let [showModal, setShowModal] = useState(false);
  let [modalWord, setModalWord] = useState(null);
  let [modalPronounce, setModalPronounce] = useState(null);
  let [modalStudyId, setModalStudyId] = useState(null);

  const handleWordClick = (word, pronounce, studyId) => {
    setModalWord(word);
    setModalPronounce(pronounce);
    setModalStudyId(studyId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalWord(null);
    setModalPronounce(null);
  };

  useEffect(() => {
    getVocabulary(currentChapter, currentVocaPage);
  }, [currentChapter, currentVocaPage]);

  const handleOnVocaClick = (index) => {
    setCurrentChapter(index);
    setCurrentVocaPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentVocaPage(page);
  };

  const handleUpPageChange = () => {
    if (currentVocaPage < totalPages) {
      const newPage = currentVocaPage + 1;
      setCurrentVocaPage(newPage);
    }
  };

  const handleDownPageChange = () => {
    if (currentVocaPage > 1) {
      const newPage = currentVocaPage - 1;
      setCurrentVocaPage(newPage);
    }
  };

  const deleteVoca = (studyId) => {
    baseApi({
      method: "delete",
      url: "/vocabulary",
      data: {
          studyId: studyId,
      },
    })
      .then((res) => {
        console.log(res);
        getVocabulary(currentChapter, currentVocaPage);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    console.log(currentVocaItem),
    (
      <div className="VocaList container">
        {/* 칠판 위 드롭다운 버튼 */}
        <Dropdown className="TabDropDownButton">
          <Dropdown.Toggle id="dropdown-basic" className="TabDropDownToggle">
            {`Ch${modifiedChapterTitle[currentChapter].chapterId}. ${modifiedChapterTitle[currentChapter].chapterName}`}
          </Dropdown.Toggle>
          <VocaTabDropDown
            content={modifiedChapterTitle}
            handleOnVocaClick={handleOnVocaClick}
          />
        </Dropdown>

        {/* 칠판 안 */}
        <div className="VocaListContent">
          {currentVocaItem.content.length === 0 ? (
            <div className="VocaListWord">
              <Text32 text="저장된 단어가 없습니다" />
            </div>
          ) : (
            currentVocaItem.content.map((item, i) => {
              return (
                <div className="VocalListGroup">
                  {/* 단어 */}
                  <div
                    className="VocaListWord"
                    onClick={() => {
                      handleWordClick(
                        item.word,
                        "item.pronounce",
                        item.studyId
                      );
                    }}
                  >
                    <Text32 text={item.word} />
                  </div>

                  {/* 단어장 단어 삭제 버튼 */}

                  <button
                    className="VocalListDelete"
                    onClick={() => {
                      deleteVoca(item.studyId);
                    }}
                  >
                    단어 삭제
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* 칠판 */}
        <ChapterList title={"나의 단어장"} />

        {/* 모달 */}
        <div className="FlyingModal">
          {showModal ? (
            <VocaModal
              word={modalWord}
              pronounce={modalPronounce}
              studyId={modalStudyId}
              onClose={handleCloseModal}
            />
          ) : null}
        </div>

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
    )
  );
}

export default VocabularyList;
