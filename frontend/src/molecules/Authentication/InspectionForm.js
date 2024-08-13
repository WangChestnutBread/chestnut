import React, {useState} from "react";
import InspectionButton from "../../atoms/Authentication/InspectionButton";
import IdLengthText from "../../atoms/Authentication/IdLengthText";
import "../../atoms/Authentication/Page.css";
function InspectionForm(props){
    return(
        <div>
            <form className="FormBorder LoginFormFont" >
                <input className="LoginFormBorder LoginFormFont" type="text" value={props.value} onChange={props.input} placeholder={props.content}/>
                {props.name && props.work && (
                    <InspectionButton name={props.name} work={props.work} />
                )}
            </form>
            <IdLengthText text={props.text} />
        </div>
        
    );
}
export default InspectionForm;