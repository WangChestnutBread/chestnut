import React from "react";
import "./BlackBoard.css";
function BlackBoard(props) {
  return (
    <div className="container">
      <div className="BlackBoardBox">
        <div className="BoardBox">
          <div className="ChapterContent">
            {props.work.map(
              (number, idx)=>{
                <div>{number.data.word}</div>
              }
            )}
          </div>
          <div className="ChapterContent">
            {props.content}
          </div>
          <div className="greenBox">
            <img className="pencil" src="/image/pencil.png" />
            <img className="eraser" src="/image/ERASER.png" />
          </div>
          <div className="brownBar" />
        </div>
      </div>
    </div>
  );
}
export default BlackBoard;
