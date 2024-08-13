import React from "react";
import LoginIdPwFont from "../../atoms/Authentication/LoginIdPwFont";
import LoginInputForm from "../../atoms/Authentication/LoginInputForm";
import IdLengthText from "../../atoms/Authentication/IdLengthText";
import "./LoginInput.css";

function LoginIdInput(props){
    return(
        <div className="LoginBox">
            <LoginIdPwFont title={props.title} />
            <LoginInputForm content={props.content} 
                value={props.value} 
                work={props.work} 
                inputRef={props.inputRef} 
                onSubmit={props.onSubmit}/>
            <IdLengthText text={props.text} />
        </div>
        
    );
}
export default LoginIdInput;