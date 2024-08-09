import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./StartTemplates.css";

function LandingPage() {
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  const GotoLogin = () => {
    navigate("/member/login");
  };
  const GotoSignup = () => {
    navigate("/member/signup");
  }
  return (
    <div className="landing-page">
      <div className="content">
        <div className="logo-container">
          <img src="/image/Logo.png" alt="Logo" className="logo" />
        </div>
        <div className={`button-container ${showButtons ? 'show' : ''}`}>
          <button className="landing-button" onClick={GotoLogin}>
            로그인
          </button>
          <button className="landing-button" onClick={GotoSignup}>
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;