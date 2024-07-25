import React from "react";
import styled from "./Page.css";
function LoginButton(props){
    return(
        <button className="LoginButtonBorder" type="submit">
            <div className="LoginButtonFont">{props.button}</div>
        </button>
    );
}

export default LoginButton;