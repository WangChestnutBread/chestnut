import "./NavbarExample.css"
import ChestNutButton from "../organisms/ChestNutButton"
import SentenceButton from "../organisms/SentenceButton";
import BookMarkButton from "../molecules/BookMarkButton"

function NavbarExample({ showSentenceButton, showBookMarkButton }) {
    return (
        <div className="NavbarExample">
            <div className="NavbarButton">
                <div className="LeftButton">
                    <ChestNutButton/> {/* 기본 navbar 내용 */}
                </div>
                <div className="RightButton">
                    {showSentenceButton && <SentenceButton />} {/* 챕터 5 페이지에서만 사용 */}
                    {/*챕터 3,4 페이지에서만 사용 */}
                    {showBookMarkButton && <BookMarkButton />} 
                </div>
            </div>
        </div>
    )
}

export default NavbarExample;