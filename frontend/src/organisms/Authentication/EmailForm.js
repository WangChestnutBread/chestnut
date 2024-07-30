import React from "react";
import InfoBox from "../../molecules/Authentication/InfoBox";
import InspectionButton from "../../atoms/Authentication/InspectionButton";
function EmailForm(props){
    return(
        <div>
            <InfoBox title={props.title} name={props.name}/>
            <InspectionButton name={'변경'}/>
        </div>
        
    );
}
export default EmailForm;