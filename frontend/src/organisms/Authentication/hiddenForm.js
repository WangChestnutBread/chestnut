import React from "react";
import InspectionFormNoRed from "../../molecules/Authentication/InspectionForm.noVerRed";
import "./hiddenForm.css";
function hiddenForm(){
    return(
        <div className="hiddenForm">
            <InspectionFormNoRed content={'이메일'} name={'인증'}/>
            <InspectionFormNoRed content={'인증번호'} name={'확인'} />
        </div>
        
    );
}
export default hiddenForm;