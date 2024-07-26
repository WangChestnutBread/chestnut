import React from "react";
import MyInfoBox from "../../atoms/Authentication/MyInfoBox";
import LoginIdPwFont from "../../atoms/Authentication/LoginIdPwFont";
function InfoBox(props){
    return(
        <div>
            <LoginIdPwFont title={props.title} />
            <MyInfoBox name={props.name}/>
        </div>
    );
}
export default InfoBox;