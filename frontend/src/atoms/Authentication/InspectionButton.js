import React from "react";
import "./Page.css";
function InspectionButton(props){
    return(
        <button className="InspectionButton" onClick={props.work}>
            <div className="InspectionButtonFont">{props.name}</div>
        </button>
    );
}
export default InspectionButton;