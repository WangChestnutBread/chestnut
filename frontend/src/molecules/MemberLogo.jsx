import React from "react";
import "./MemberLogo.css";
function MemberLogo(props){
    return(
        <div>
              <div className="LogoBox">
                <img style={{width: 200, height: 100, left: 0, top: 0, position: 'absolute'}} src="/image/Logo.png" />
            </div>
            <div className="SubTitle">{props.title}</div>
        </div>
    );
}
export default MemberLogo;