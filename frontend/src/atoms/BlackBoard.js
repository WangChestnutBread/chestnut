import React, { useState, useEffect } from "react";
import "./BlackBoard.css";



function BlackBoard(props) {

  
  return (
    <div className="container">
      <div className="BlackBoardBox">
        <div className="BoardBox">
          <div className="ChapterContent">
          </div>
          <div className="ChapterContent">
            {props.content}
          </div>
          <div className="greenBox">
            <img className="pencil" src="/image/pencil.png" alt="Pencil" />
            <img className="eraser" src="/image/ERASER.png" alt="Eraser" />
          </div>
          <div className="brownBar" />
        </div>
      </div>
    </div>
  );
}

export default BlackBoard;
