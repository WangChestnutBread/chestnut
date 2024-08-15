import "./NavbarExample.css";
import ChestNutButton from "../organisms/ChestNutButton";
import SentenceButton from "../organisms/SentenceButton";
import BookMarkButton from "../molecules/BookMarkButton";

function NavbarExample({ showSentenceButton, showBookMarkButton, studyId, isVocabulary, sentences }) {
  console.log("네브바isVocabulary", isVocabulary);

  return (
    <div className="NavbarExample">
      <div className="NavbarButton">
        <div className="LeftButton">
          <ChestNutButton /> {/* 기본 navbar 내용 */}
        </div>
        <div className="RightButton">
          {showSentenceButton && <SentenceButton sentences={sentences} />}
          {/* 챕터 5 페이지에서만 사용 */}
          {/*챕터 3,4 페이지에서만 사용 */}
          {showBookMarkButton && <BookMarkButton studyId={studyId} isVocabulary={isVocabulary}/>}
        </div>
      </div>
    </div>
  );
}

export default NavbarExample;
