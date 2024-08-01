import React, {useState} from "react";
import InspectionForm from "../../molecules/Authentication/InspectionForm";
import LoginIdPwFont from "../../atoms/Authentication/LoginIdPwFont";
import "../../atoms/Authentication/Page.css";
function FindIdForm(props){
    return(
        <div>
            <LoginIdPwFont title={props.title} />
            <InspectionForm content={props.content} text={props.text} name={props.name} work={props.work} value={props.value} input={props.input}/>
        </div>
        
    );
}
export default FindIdForm;