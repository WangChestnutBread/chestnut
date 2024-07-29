import React from "react";
function BirthInfo(props){
    return(
        <div className="InfoBox">
            <div className="Font">{props.value}</div>
        </div>
    );
}
export default BirthInfo;