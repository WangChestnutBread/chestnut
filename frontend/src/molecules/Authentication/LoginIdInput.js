import React from "react";
import LoginIdPwFont from "../../atoms/Authentication/LoginIdPwFont";
import LoginInputForm from "../../atoms/Authentication/LoginInputForm";
import "./LoginInput.css";
function LoginIdInput(props){
    return(
        <div className="LoginBox">
            <LoginIdPwFont title={props.title} />
            <LoginInputForm content={props.content} />
        </div>
        
    );
}
export default LoginIdInput;