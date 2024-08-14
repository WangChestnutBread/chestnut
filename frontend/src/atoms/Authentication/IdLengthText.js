import React from "react";
import "./IdLengthText.css";
function IdLengthText(props){
    return(
        <div className="Box">
            <div className="LengthAlert">{props.text}</div>
        </div>
        
    );
}
export default IdLengthText;