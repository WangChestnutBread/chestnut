import React from "react";
import "./MemberLogo.css";
function MemberLogo(props){
    return(
        <div>
              <div className="LogoBox">
                <img style={{width: 200, height: 100}} src="/image/Logo.png" />
            </div>
            <div className="TitleBox">
                <div className="SubTitle">{props.title}</div>
            </div>
            
        </div>
    );
}
export default MemberLogo;