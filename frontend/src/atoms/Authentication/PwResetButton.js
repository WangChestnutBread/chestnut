import React from "react";
import "./Page.css";
import { useNavigate } from "react-router-dom";
function PwResetButton(props){
    return(
        <button className="pwResetButton" onClick={props.work}>
            <div className="pwResetFont">{props.button}</div>
        </button>
    );
}

export default PwResetButton;