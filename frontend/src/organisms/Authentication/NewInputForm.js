import React, {useState} from "react";
import "../../atoms/Authentication/Page.css";
import SignUpPwInput from "../../molecules/Authentication/SignUpPwInput";
import LoginIdPwFont from "../../atoms/Authentication/LoginIdPwFont";
function NewInputForm(props){
    return(
        <div>
            <LoginIdPwFont title={props.title} />
            <SignUpPwInput value={props.value} content={props.content} work={props.work} text={props.text}/>
        </div>
        
    );
}
export default NewInputForm;