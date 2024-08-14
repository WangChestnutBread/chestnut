import React from "react";
import "./IdLengthText.css";
function IdLengthText(props){
    return(
        <>
        {props.text && (
            <div className="Box">
                <div className="LengthAlert">{props.text}</div>
            </div>
        )}
        </>
    );
}
export default IdLengthText;