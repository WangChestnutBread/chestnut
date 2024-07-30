import React from "react";
import LoginIdPwFont from "../../atoms/Authentication/LoginIdPwFont";
import LoginInputPwForm from "../../atoms/Authentication/LoginInputPwForm";
import "./LoginInput.css";
function LoginIdInput(props){
    return(
        <div className="LoginBox">
            <LoginIdPwFont title={props.title} />
            <LoginInputPwForm content={props.content} value={props.value} work={props.work}/>
        </div>
        
    );
}
export default LoginIdInput;