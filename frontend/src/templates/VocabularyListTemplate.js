import "./VocabularyListTemplate.css"
import QuestionMarkButton from "../molecules/QuestionMarkButton";
import StudyBackButton from "../molecules/StudyBackButton";
import ChestNutButton from "../organisms/ChestNutButton";
import VocabularyList from "../organisms/VocabularyList";
import "./NavbarExample.css"
import Pagenation from "../atoms/Pagenation";


function VocabularyListTemplate() {
    return (
        <div className="VocabularyListTemplate">
            {/* navbar */}
            <div className="NavbarExample">
                <div className="NavbarButton">
                    <div className="LeftButton">
                        <StudyBackButton/>
                        <ChestNutButton/>
                    </div>
                    <div className="RightButton">
                        <QuestionMarkButton/>
                    </div>
                </div>
            </div>

            {/* 단어장 칠판 */}
            <VocabularyList/>

            {/* 페이지네이션 */}
            <Pagenation/>
        </div>
    )
}

export default VocabularyListTemplate;