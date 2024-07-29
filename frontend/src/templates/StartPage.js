import React from "react";
import { Link } from "react-router-dom";
import "./StartPage.css";

function LandingPage() {
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
      <Link to="/login" className="LoginPageButton no-underline">
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
      </Link>
      <Link to="/signup" className="SignUpButton no-underline">
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
      </Link>
      <img
        style={{ width: 174, height: 95, left: 907, top: 508, position: "absolute" }} src="/image/sexysquezz.png"/>
    </div>
  );
}

export default LandingPage;
