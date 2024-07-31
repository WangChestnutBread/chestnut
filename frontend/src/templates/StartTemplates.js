import React from "react";
import { Link,useNavigate } from "react-router-dom";
import "./StartTemplates.css";

function LandingPage() {
  const navigate = useNavigate();
  const GotoLogin=()=>{
    navigate("/member/login");
  };
  const GotoSignup=()=>{
    navigate("/member/signup");
  }
  return (
    <div className="container">
      <div className="LandingPage">
        <div style={{width: 601, height: 604.85, position: 'relative', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
        <div style={{width: 438, height: 350.85, position: 'relative'}}>
            <div style={{height: 319.85, top: 31, position: 'absolute', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                <img style={{width: 438}} src="/image/Logo.png" />
            </div>
            <div style={{left: 406, position: 'absolute', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                <img style={{width: 174, height: 191, mixBlendMode: 'darken'}} src="/image/drawsquzz.png" />
            </div>
        </div>
        <div style={{paddingTop: 400, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 25, display: 'flex'}}>
            <button className="LoginPageButton no-underline" onClick={GotoLogin}>
              <div style={{ textAlign: "center", color: "white", fontSize: 32, fontFamily: "Jua", fontWeight: "400", wordWrap: "break-word"}}>로그인</div>
            </button>
            <button className="SignUpButton no-underline" onClick={GotoSignup}>
              <div style={{width: 445, height: 40, textAlign: "center", color: "white", fontSize: 32, fontFamily: "Jua", fontWeight: "400", wordWrap: "break-word"}}>회원가입</div></button></div>
        <img style={{width: 174, height: 95}} src="/image/sexysquezz.png" />
    </div>
      </div>
</div>
  );
}

export default LandingPage;
