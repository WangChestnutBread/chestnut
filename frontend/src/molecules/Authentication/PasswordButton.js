import React from "react";
import LoginButton from "../../atoms/Authentication/LoginButton";
import "./LoginButton.css";
function PasswordButton(props){
    return(
        <div className={props.classname}>
            <LoginButton button={props.button} work={props.work}/>
        </div>
        
    );
}
export default PasswordButton;