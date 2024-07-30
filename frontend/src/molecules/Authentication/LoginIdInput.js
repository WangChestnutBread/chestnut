import React from "react";
import LoginIdPwFont from "../../atoms/Authentication/LoginIdPwFont";
import LoginInputForm from "../../atoms/Authentication/LoginInputForm";
import "./LoginInput.css";
function LoginIdInput(props){
    return(
        <div className="LoginBox">
            <LoginIdPwFont title={props.title} />
            <LoginInputForm content={props.content} value={props.value} work={props.work}/>
        </div>
        
    );
}
export default LoginIdInput;