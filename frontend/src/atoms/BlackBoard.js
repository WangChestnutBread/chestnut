import React, { useState, useEffect } from "react";
import "./BlackBoard.css";

// function Word({ number }) {


//   return (
//     <div>
//       <b>{number}</b>
//     </div>
//   );
// }

function BlackBoard(props) {
  // const workItems = props.word || [];
  // const [data1, setData1] = useState([]);
  // const [data2, setData2] = useState("");
  // workItems.map((number, idx)=>(
  //   if(number.categoryContent == 1) {
  //     setData1(workItems.word);
  // }
  // ))
  
  return (
    <div className="container">
      <div className="BlackBoardBox">
        <div className="BoardBox">
          <div className="ChapterContent">
            {/* <div>자음</div>
            {data1.map((number, idx) => (
              <Word number={number} key={idx} />
            ))} */}
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
