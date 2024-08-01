import "./NavbarExample.css"
import StudyBackButton from "../molecules/StudyBackButton"
import ChestNutButton from "../organisms/ChestNutButton"
import SentenceButton from "../organisms/SentenceButton";
import BookMarkButton from "../molecules/BookMarkButton"
import QuestionMarkButton from "../molecules/QuestionMarkButton"

function NavbarExample() {
    return (
        <div className="NavbarExample">
            <div className="NavbarButton">
                <div className="LeftButton">
                    <StudyBackButton/>
                    <ChestNutButton/>
                </div>
                <div className="RightButton">
                    <SentenceButton/>
                    <BookMarkButton/>
                    <QuestionMarkButton/>
                </div>
            </div>
        </div>
    )
}

export default NavbarExample;