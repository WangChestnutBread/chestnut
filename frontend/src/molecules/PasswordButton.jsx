import React from "react";
import LoginButton from "../atoms/LoginButton";
import "./LoginButton.css";
function PasswordButton(props){
    return(
        <div className="pwButton">
            <LoginButton button={props.button}/>
        </div>
        
    );
}
export default PasswordButton;