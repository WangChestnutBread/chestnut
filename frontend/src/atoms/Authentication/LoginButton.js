import React from "react";
import "./Page.css";
function LoginButton(props){
    return(
        <button className="LoginButtonBorder">
            <div className="LoginButtonFont">{props.button}</div>
        </button>
    );
}

export default LoginButton;