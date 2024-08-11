import React from "react";
import "./ChapterMenu.css";
function ChapterMenu(props) {
  return (
    <div className="card">
      <div className="subcard">
        <div className="title">
          <div className="titleFont">{props.title}</div>
          <div className="imgbox">
            <img
              className="imgcontent"
              src={`/image/Chapter${props.chapterId}.png`}
            />
          </div>
        </div>
        <button className="studybutton" onClick={props.work}>
          <div className="buttonbox">
            <div style={{ position: "relative" }}>
              <div className="playbox">
                <div className="play-img">
                  <img src="/icons/Play.svg" />
                </div>
              </div>
              <div className="playfont">학습하기</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
export default ChapterMenu;
