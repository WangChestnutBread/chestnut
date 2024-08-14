import React, { useState ,useRef } from "react";
import { useNavigate } from "react-router-dom";
import MemberLogo from "../../molecules/Authentication/MemberLogo";
import LoginIdInput from "../../molecules/Authentication/LoginIdInput";
import Button from "../../molecules/Authentication/Button";
import BackButton from "../../atoms/BackButton";
import baseApi from "../../api/fetchAPI";
import CustomAlert from "../../atoms/alert";

function FindId() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isFind, setIsFind] = useState("");

    const nameInputRef = useRef(null);
    const emailInputRef = useRef(null);

    const [alertContent, setAlertContent] = useState("");

    const handleChangeName = (event) => {
        setName(event.target.value);
        if (event.target.value) {
            setNameError("");
        } else {
            setNameError("이름을 입력하세요.");
        }
    };

    const handleChangeEmail = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        const isValid = validateEmail(event.target.value);
        setIsEmailValid(isValid);
        if ( !newEmail ){
            setEmailError("이메일을 입력하세요.");
        } else if ( !isValid ) {
            setEmailError("유효한 이메일을 입력하세요.")
        } else {
            setEmailError("")
        }
    };

    const navigate = useNavigate();

    const succes = () => {
        if (!name) {
            setNameError("이름을 입력하세요.");
            if (nameInputRef.current) nameInputRef.current.focus(); // 유효한 ref에서 포커스
            return;
        }

        if (!email) {
            setEmailError("이메일을 입력하세요.");
            if (emailInputRef.current) emailInputRef.current.focus(); // 유효한 ref에서 포커스
            return;
        } else if (!isEmailValid) {
            setEmailError("유효한 이메일을 입력하세요.");
            if (emailInputRef.current) emailInputRef.current.focus(); // 유효한 ref에서 포커스
            return;
        }

        baseApi.post("/member/find-id", {
            memberName: name,
            email: email
        })
        .then((res) => {
            console.log(res);
            if (res.data.code === "200") {
                setIsFind(true);
                setAlertContent(`<div style="display: block;">
                                    ${name}님의 아이디는 '${res.data.data.loginId}'입니다.
                                <div>`);
                return;
            }
            if (res.data.code === "714" || res.data.code === "713") {
                setAlertContent(`<div style="display: block;">
                    등록된 사용자가 아닙니다.
                    <div>`);
            } else {
                setAlertContent(`<div style="display: block;">
                    알 수 없는 오류가 발생했습니다.
                    <div>`);
            }
            setIsFind(false);
        }).catch(error => {
            console.log(error);
        });
    };

    //이메일 유효성 검사
    const validateEmail = (email) => {
        const emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,3}$/;
        return emailRegex.test(email);
    }

    const GotoBack = () => {
        navigate("/");
    };

    const handleCloseAlert = () => {
        setAlertContent(null); // Alert 닫기
        if(isFind) navigate("/member/login");
        else{
            setName("");
            setEmail("");
        }
    };

    return (
        <div className="container">
            <div style={{ padding: 50, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <BackButton work={GotoBack} />
                <div style={{ width: 786, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', 
                                gap: 22, display: 'flex' }}>
                    <MemberLogo title={'ID 찾기'} />
                    <div style={{
                        paddingLeft: 20,
                        paddingRight: 30,
                        paddingTop: 20,
                        paddingBottom: 20, 
                        background: '#DCB78F', 
                        borderRadius: 25, 
                        overflow: 'hidden', 
                        flexDirection: 'column', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        display: 'flex'
                    }}>
                        <div style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 14, display: 'flex', marginTop: 20 }}>
                            <LoginIdInput 
                                title={'이름'} 
                                value={name} 
                                content={'이름을 입력하세요'} 
                                work={handleChangeName}
                                inputRef={nameInputRef} // ref 전달
                                onSubmit={succes}
                                text={nameError}
                            />
                            <LoginIdInput 
                                title={'이메일'} 
                                value={email} 
                                content={'이메일을 입력하세요'} 
                                work={handleChangeEmail}
                                inputRef={emailInputRef} // ref 전달
                                onSubmit={succes}
                                text={emailError}
                            />
                        </div>
                        <div style={{ height: 108, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 27, display: 'flex' }}>
                            <Button button={'아이디 찾기'} work={succes} />
                        </div>
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

export default FindId;