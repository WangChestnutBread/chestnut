import React, { useState } from "react";
import PasswordButton from "../../molecules/Authentication/PasswordButton";
import MemberLogo from "../../molecules/Authentication/MemberLogo";
import FindIdForm from "../../organisms/Authentication/FindIdForm";
import LoginIdInput from "../../molecules/Authentication/LoginIdInput";
import BackButton from "../../atoms/BackButton";
import { useNavigate } from "react-router-dom";
import NewInputForm from "../../organisms/Authentication/NewInputForm";
import "./FindPw.css";
import CustomAlert from "../../atoms/alert";
function FindPw() {
    const navigate = useNavigate();

    const [Pw, setPw] = useState("");
    const [PwCon, setPwCon] = useState("");
    const [Auth, setAuth] = useState("");
    const [Email, setEmail] = useState("");

    const [PwMessage, setPwMessage] = useState("");
    const [PwConMessage, setPwConMessage] = useState("");
    const [AuthMessage, setAuthMessage] = useState("");

    const [isPw, setIsPw] = useState(false);
    const [isPwCon, setIsPwCon] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    const [alertContent, setAlertContent] = useState("");

    const succes = () => {
        alert("비밀번호가 변경되었습니다.")
        navigate("/member/login");
    };

    const GotoBack = () => {
        navigate(-1);
    };

    const inputEmail = (e) => {
        const currentEmail = e.target.value;
        setEmail(currentEmail);
    };

    const inputAuth = (e) => {
        const currentAuth = e.target.value;
        setAuth(currentAuth);
    };

    const createPw = (e) => {
        const currentPw = e.target.value;
        setPw(currentPw);
        const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!passwordRegExp.test(currentPw)) {
            setPwMessage("숫자, 영문자, 특수문자 조합으로 8자리 이상 입력해주세요.");
            setIsPw(false);
        } else {
            setPwMessage("안전한 비밀번호입니다.");
            setIsPw(true);
        }
    };

    const handleSubmit = (event) => {
        setAlertContent("인증번호를 전송했습니다.");
        event.preventDefault();
    };

    const createPwCon = (e) => {
        const currentPwCon = e.target.value;
        setPwCon(currentPwCon);
        if (Pw !== currentPwCon) {
            setPwConMessage("비밀번호가 일치하지 않습니다.");
            setIsPwCon(false);
        } else {
            setPwConMessage("비밀번호가 일치합니다.");
            setIsPwCon(true);
        }
        
    };

    const checkAuth = (e) => {
        if (Auth !== "1234") {
            setAuthMessage("인증번호가 일치하지 않습니다.");
            setIsAuth(false);
        } else {
            setAuthMessage("인증번호가 일치합니다.");
            setIsAuth(true);
        }
        e.preventDefault();
    };

    return (
        <div className="container">
            <div className="totalpage">
                <BackButton work={GotoBack} />
                <div style={{ width: 786, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <MemberLogo title={'PW 찾기'} />
                    <div className="formlist">
                            <div className="idbox">
                                <LoginIdInput title={'ID'} content={'아이디를 입력하세요'} />
                            </div>
                            <div className="formbox">
                                <FindIdForm title={'이메일'} content={'이메일을 입력하세요'} name={'전송'} work={handleSubmit} value={Email} input={inputEmail}/>
                            </div>
                            <div className="formbox">
                                <FindIdForm title={'인증번호'} text={AuthMessage} content={'인증번호를 입력하세요'} name={'확인'}  work={checkAuth} value={Auth} input={inputAuth}/>
                            </div>
                            <div className="formbox">
                                <NewInputForm title={'새 비밀번호'} content={'비밀번호를 입력하세요'} value={Pw} work={createPw}  text={PwMessage}/>
                            </div>
                            <div className="formbox">
                                <NewInputForm title={'비밀번호 확인'} content={'비밀번호를 입력하세요'} value={PwCon} work={createPwCon} text={PwConMessage}/>
                            </div>
                        <PasswordButton button={'Pw 찾기'} work={succes} className={"Button"} />
                    </div>
                </div>
            </div>
            <CustomAlert content={alertContent} />
        </div>
    );
}

export default FindPw;
