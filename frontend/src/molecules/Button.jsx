import React from "react";
import LoginButton from "../atoms/LoginButton";
import "./LoginButton.css";
function Button(props){
    return(
        <div className="Button">
            <LoginButton button={props.button}/>
        </div>
        
    );
}
export default Button;