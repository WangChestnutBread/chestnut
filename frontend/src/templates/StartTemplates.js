import React from "react";
import { Link,useNavigate } from "react-router-dom";
import "./StartTemplates.css";

function LandingPage() {
  const navigate = useNavigate();
  const GotoLogin=()=>{
    navigate("/login");
  };
  const GotoSignup=()=>{
    navigate("/signup");
  }
  return (
    <div className="LandingPage">
      <div className="LandingPageMainLogo">
        <img src="/image/Logo.png" className="LandingPageLogoimage" />
      </div>
      <img
        style={{
          width: 174,
          height: 191,
          left: 907,
          top: 89,
          position: "absolute",
          mixBlendMode: "darken"
        }}
        src="/image/drawsquzz.png"
      />
      <button className="LoginPageButton no-underline" onClick={GotoLogin}>
        <div
          style={{
            width: 445,
            height: 53,
            textAlign: "center",
            color: "white",
            fontSize: 32,
            fontFamily: "Jua",
            fontWeight: "400",
            wordWrap: "break-word"
          }}
        >
          로그인
        </div>
      </button>
      <button className="SignUpButton no-underline" onClick={GotoSignup}>
        <div
          style={{
            width: 445,
            height: 40,
            textAlign: "center",
            color: "white",
            fontSize: 32,
            fontFamily: "Jua",
            fontWeight: "400",
            wordWrap: "break-word"
          }}
        >
          회원가입
        </div>
      </button>
      <img
        style={{ width: 174, height: 95, left: 907, top: 508, position: "absolute" }} src="/image/sexysquezz.png"/>
    </div>
  );
}

export default LandingPage;
