import React from "react";
import LoginButton from "../../atoms/Authentication/LoginButton";
import "./LoginButton.css";
function ProfileButton(props){
    return(
        <div className="profileButton">
            <LoginButton button={props.button}/>
        </div>
        
    );
}
export default ProfileButton;