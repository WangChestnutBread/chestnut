import React from "react";
import "./Page.css";
import { useNavigate } from "react-router-dom";
function PwResetButton(props){
    return(
        <div>
           <button className="pwResetButton" onClick={props.work}>
                <div className="pwResetFont">{props.button}</div>
            </button> 
        </div>
        
    );
}

export default PwResetButton;