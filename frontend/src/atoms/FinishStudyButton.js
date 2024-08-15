import "./FinishStudyButton.css";

function FinishStudyButton({checked, handleOnClick}) {
    if (!checked) {
      return (<button className="UnFinishButton" onClick={handleOnClick}>학습 완료 하기</button>)
      
    } else {
      return <button className="FinishButton" onClick={handleOnClick}>학습 완료</button>
    }
  
}

export default FinishStudyButton;