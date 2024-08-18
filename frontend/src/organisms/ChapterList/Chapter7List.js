import "./Chapter4_7List.css";
import ChapterList from "../../molecules/ChapterList/ChapterList";
import BlackBoardTab from "../../molecules/ChapterList/BlackBoardTab";
import { useState } from "react";
import Text32 from "../../atoms/Text32";
import VocaModal from "../Vocabulary/VocaModal";

function Chapter7List({ content }) {
  // console.log(content)
  const handleTabClick = (index) => {
    setCurrentTab(index);
  };

  let [currentTab, setCurrentTab] = useState(0);
  let [currentRule, setCurrentRule] = useState(0);
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

  return (
    <div className="BlackBoardWithTab">
      <div className="BlackBoardWithLine">
        <div className="BlackBoardBody">
          {/* 칠판 위 탭 버튼 */}
          <div className="TabButton">
            {content.map((item, i) => {
              return (
                <BlackBoardTab
                  key={`${item.parentCategory}-${i}`}
                  tabTitle={item.parentCategory}
                  isActive={currentTab === i}
                  onClick={() => {
                    handleTabClick(i);
                    setCurrentRule(0);
                  }}
                />
              );
            })}
          </div>

          {/* 칠판 안 */}
          <div className="BoardInside">
            {/* 칠판 왼쪽 내용 */}
            <div className="LeftBoardList">
              {content[currentTab].childCategory.map((item, i) => {
                return (
                  <div key={`${item.categoryContent}-${i}`}>
                    <div
                      className={`LeftBoardText ${
                        currentRule === i ? "active" : ""
                      }`}
                      onClick={() => {
                        setCurrentRule(i);
                      }}
                    >
                      <Text32 text={item.categoryContent} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 칠판 가운데 점선 */}
            <div className="VerticalLine"></div>

            {/* 칠판 오른쪽 내용 */}
            <div className="RightBoardFor7">
              <div className="RightBoardTextFor7">
                {content[currentTab].childCategory[
                  currentRule
                ].grandChildCategory.map((item, i) => {
                  return (
                    <div className="RightBoardBox">
                      {item.map((pair, j) => {
                        console.log(pair);
                        return (
                          <div
                            key={j}
                            className="RightBoardPair"
                            style={
                              pair.isPass
                                ? { color: "#74A6FD" }
                                : pair.isStudy
                                ? { color: "#CECECE" }
                                : null
                            }
                          >
                            <div
                              className="RightBoardWord"
                              onClick={() => {
                                handleWordClick(
                                  pair.word,
                                  pair.pronounce,
                                  pair.studyId
                                );
                              }}
                            >
                              <p>{pair.word}</p>
                              <p>[{pair.pronounce}]</p>
                            </div>
                            <div className="Vs">
                              {j !== item.length - 1 ? <span>vs</span> : null}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 칠판 */}
          <ChapterList title="Ch7. 헷갈리는 발음" />
        </div>
      </div>

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
    </div>
  );
}

export default Chapter7List;
