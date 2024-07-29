import Text24 from "../../atoms/Text24"
import "./LastStudyButton.css"

function LastStudyButton() {

    return (
        <button className="LastStudyButton">
            <div className="LastStudyButtonText">
                <img src="/icons/LastStudyButton.svg" width="30px" height="100%"/>
                <Text24 text="마지막 학습 보기"/>
            </div>
        </button>        
    )
}

export default LastStudyButton;