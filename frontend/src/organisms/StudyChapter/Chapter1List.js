import "./Chapter1List.css";
import ChapterList from "../../molecules/StudyList/ChapterList";
import Text32 from "../../atoms/Text32";
import { useNavigate } from "react-router-dom";

function Chapter1List({ content, chapterId }) {
  let navigate = useNavigate();

  return (
    <div className="Chapter1List">
      {/* 칠판 안 */}
      <div className="Chapter1Content">
        {content.map((item, i) => {
          return (
            <div className="Chapter1Group">
              {/* 자음/모음 제목 */}
              <div className="ContentTitle">
                <Text32 text={item.categoryContent} />
              </div>

              {/* 자음/모음 내용 */}
              <div className="ContentBox">
                {item.child.map((itemchild) => {
                  return (
                    <div
                      className="ContentWord"
                      style={itemchild.isStudy ? { color: "#74A6FD" } : null}
                      onClick={() => {
                        navigate(
                          `/study/detail${chapterId}/${chapterId}/${itemchild.studyId}`
                        );
                      }}
                    >
                      <Text32 text={itemchild.word} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* 칠판 */}
      <div className="Chapter1Board">
        <ChapterList title={"Ch1. 자음/모음"} />
      </div>
    </div>
  );
}
export default Chapter1List;
