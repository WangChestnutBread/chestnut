import React from "react";
import MyInfoBox from "../atoms/MyInfoBox";
import LoginIdPwFont from "../atoms/LoginIdPwFont";
function InfoBox(props){
    return(
        <div>
            <LoginIdPwFont title={props.title} />
            <MyInfoBox name={props.name}/>
        </div>
    );
}
export default InfoBox;