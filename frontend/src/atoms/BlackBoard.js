import React from "react";
import "./BlackBoard.css";
function BlackBoard(){
    return(
        <div className="container">
            <div className="BlackBoardBox">
                <div className="MainBoard">
                    <div className="Box1">
                        <div className="Size">
                            <div className="BoardBox">
                                <div className="greenBox">
                                    <img className="pencil" src="/image/pencil.png" />
                                    <img className="eraser" src="/image/ERASER.png" />
                                </div>
                                <div className="brownBar" />
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default BlackBoard;