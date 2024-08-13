import React from "react";
import "./MemberLogo.css";
function MemberLogo(props){
    return(
        <div style={{display: "flex", justifyContent: "center"}}>
            <div className="LogoBox">
                <img style={{height: 100}} src="/image/Logo.png" />
            </div>
            <div className="TitleBox">
                <div className="SubTitle">{props.title}</div>
            </div>
            
        </div>
    );
}
export default MemberLogo;