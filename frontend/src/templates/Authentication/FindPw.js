import React, { useState } from "react";
import axios from "axios";
import PasswordButton from "../../molecules/Authentication/PasswordButton";
import MemberLogo from "../../molecules/Authentication/MemberLogo";
import FindIdForm from "../../organisms/Authentication/FindIdForm";
import LoginIdInput from "../../molecules/Authentication/LoginIdInput";
import BackButton from "../../atoms/BackButton";
import { useNavigate } from "react-router-dom";
import NewInputForm from "../../organisms/Authentication/NewInputForm";
import "./FindPw.css";
import CustomAlert from "../../atoms/alert";
import InspectionForm from "../../molecules/Authentication/InspectionForm";
import { error } from "jquery";
function FindPw() {
    const navigate = useNavigate();

    const [Id, setId] = useState("");
    const [Pw, setPw] = useState("");
    const [PwCon, setPwCon] = useState("");
    const [Auth, setAuth] = useState("");
    const [Email, setEmail] = useState("");

    const [PwMessage, setPwMessage] = useState("");
    const [PwConMessage, setPwConMessage] = useState("");
    const [AuthMessage, setAuthMessage] = useState("");
    const [EmailMessage, setEmailMessage] = useState("");

    const [isPw, setIsPw] = useState(false);
    const [isPwCon, setIsPwCon] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isEmail, setIsEmail] = useState(false);

    const [isChange, setIsChange] = useState("");

    const [alertContent, setAlertContent] = useState("");

    const url = "https://i11d107.p.ssafy.io/chestnutApi";

    const succes = () => {
        console.log(Id)
        axios.post(url+"/member/reset-pwd/unknown", {
            loginId: Id,
            email: Email,
            newPassword: Pw,
            newPasswordConfirm: PwCon
        })
        .then(res => {
            console.log(res.data)
            if (res.data.code === "200") {
                setIsChange(true);
                setAlertContent("비밀번호가 변경되었습니다.")
                return;
            }
            if (res.data.code === "714") {
                setAlertContent("등록된 사용자가 아닙니다.")
            } else if (res.data.code === "603") {
                setAlertContent("비밀번호 양식이 적절하지 않습니다.");
            } else if (res.data.code === "610" || res.data.code === "604") {
                setAlertContent("비밀번호를 다시 확인하여 주세요.");
            } else if (res.data.code === "609") {
                setAlertContent("이메일을 인증하세요.");
            } else {
                setAlertContent("알 수 없는 오류가 발생하였습니다.");
            }
            setIsChange(false);
        }).catch(error => {
            console.log(error);
        })
    };

    const handleCloseAlert = () => {
        setAlertContent(null);
        if (isChange) {
            navigate("/member/login");
        }
        else {
            setPw("");
            setPwCon("");
            setAuth("");
        }
    }

    const inputId = (e) => {
        const currentId = e.target.value;
        setId(currentId);
    };

    const GotoBack = () => {
        navigate(-1);
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

    const inputEmail = (e) => {
        const currentEmail = e.target.value;
        setEmail(currentEmail);
        console.log(currentEmail);
        const emailRegExp = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
        if (!emailRegExp.test(currentEmail)) {
            setEmailMessage("이메일 형식이 올바르지 않습니다.")
            setIsEmail(false);
        } else {
            setEmailMessage("올바른 이메일 형식입니다.")
            setIsEmail(true);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isEmail) {
            setEmailMessage("이메일 형식이 올바르지 않습니다.");
            return;
        }

        axios.post(url+"/member/email/code-request", {
            email: Email,
            purpose: "changePassword",
        })
        .then(response => {
            console.log("이메일 발송")
            if (response.data.code === "200") {
                setAlertContent("인증 이메일을 발송하였습니다.");
                setIsEmail(true);
            }
            if (response.data.code === "603") {
                setEmailMessage("올바르지 않은 이메일 양식입니다.");
                setIsEmail(false);
            } else if (response.data.code === "606") {
                setEmailMessage("인증번호 보내는 데 실패했습니다.");
                setIsEmail(false);
            } else if (response.data.code === "299") {
                setEmailMessage("알 수 없는 오류가 발생했습니다.");
                setIsEmail(false);
            }
            console.log(response);
        })
        .catch(error => {
            console.log(error);
            setEmailMessage("인증 이메일 발송 중 오류가 발생했습니다.");
        });
        event.preventDefault();
    };

    const checkAuth = (e) => {
        e.preventDefault();
        if (!Auth) {
            setAlertContent("인증번호를 입력해주세요.");
            return;
        }

        axios.post(url+"/member/email/code-check", {
            email: Email,
            code: Auth,
            purpose:"changePassword"
        }).then(response => {
            console.log(Auth);
            if (response.data.code === "200") {
                setAlertContent("인증되엇습니다.");
                setAuthMessage("인증되었습니다.");
                setIsAuth(true);
            } else if (response.data.code === "605") {
                setAuthMessage("인증번호가 일치하지 않습니다.");
                setIsAuth(false);
            } else if (response.data.code === "602") {
                setAuthMessage("유효시간이 초과되었습니다. 다시 시도해주세요.");
                setIsAuth(false);
            } else if (response.data.code === "299") {
                setAuthMessage("인증에 실패했습니다. 다시 시도해주세요.");
                setIsAuth(false);
            }
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    };


    return (
        <div className="container">
            <div className="totalpage">
                <BackButton work={GotoBack} />
                <div style={{ width: 786, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                    <MemberLogo title={'PW 찾기'} />
                    <div className="formlist">
                            <div className="formbox">
                                <InspectionForm title={'ID'} content={'아이디를 입력하세요'} value={Id} input={inputId} />
                            </div>
                            <div className="formbox">
                                <InspectionForm title={'이메일'} content={'이메일을 입력하세요'} name={'전송'} work={handleSubmit} value={Email} input={inputEmail} text={EmailMessage} disabled={!isEmail}/>
                            </div>
                            <div className="formbox">
                                <InspectionForm title={'인증번호'} text={AuthMessage} content={'인증번호를 입력하세요'} name={'확인'} work={checkAuth} value={Auth} input={inputAuth}/>
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
            {alertContent &&
                <CustomAlert content={alertContent}
                onClose={handleCloseAlert}
            />}
        </div>
    );
}

export default FindPw;