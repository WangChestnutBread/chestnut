import React from "react";
import "./Page.css";
import { useNavigate } from "react-router-dom";
function LoginButton(props){
    return(
        <button className="LoginButtonBorder" onClick={props.work}>
            <div className="LoginButtonFont">{props.button}</div>
        </button>
    );
}

export default LoginButton;