import Text24 from "../../atoms/Text24"
import "./LastStudyButton.css"

function LastStudyButton({word, onClick}) {

    return (
        <button className="LastStudyButton" onClick={onClick}>
            <div className="LastStudyButtonText">
                <img src="/icons/LastStudyButton.svg" width="30px" height="100%"/>
                {
                    word ? <Text24 text="마지막 학습 보기"/> : <Text24 text="학습 시작하기"/>
                }                
            </div>
        </button>        
    )
}

export default LastStudyButton;