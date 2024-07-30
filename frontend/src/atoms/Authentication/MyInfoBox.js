import React from "react";
import "./Page.css";
function MyInfoBox(props){
    return(
        <div className="MyInfoBox LoginFormFont">
            {props.name}
        </div>
    );
}
export default MyInfoBox;