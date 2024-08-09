import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InspectionForm from "../../molecules/Authentication/InspectionForm";
import MemberLogo from "../../molecules/Authentication/MemberLogo";
import SignUpPwInput from "../../molecules/Authentication/SignUpPwInput";
import LoginInputForm from "../../atoms/Authentication/LoginInputForm";
import BackButton from "../../atoms/BackButton";
import Birth from "../../atoms/Authentication/MemberBirth/Birth";
import BirthMonth from "../../atoms/Authentication/MemberBirth/BirthMonth";
import BirthDay from "../../atoms/Authentication/MemberBirth/BirthDay";
import Button from "../../molecules/Authentication/Button";
import baseApi from "../../api/fetchAPI";
import BirthCalendar from "../../atoms/Authentication/MemberBirth/BirthCalendar";
function SignUPPage() {
    const navigate = useNavigate();
    //뒤로가기 버튼
    const GotoBack = () => {
        navigate(-1);
    };
    //회원 가입에 필요한 변수 선언
    const [Id, setId] = useState("");
    const [Pw, setPw] = useState("");
    const [PwCon, setPwCon] = useState("");
    const [name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Auth, setAuth] = useState("");
    const [nickname, setnickname] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);

    //회원에게 보여줄 경고 메시지 변수
    const [IdMessage, setIdMessage] = useState("");
    const [PwMessage, setPwMessage] = useState("");
    const [PwConMessage, setPwConMessage] = useState("");
    const [EmailMessage, setEmailMessage] = useState("");
    const [AuthMessage, setAuthMessage] = useState("");
    const [nickMessage, setnickMessage] = useState("");

    //회원정보가 생성된 부분 포함할 변수
    const [isId, setIsId] = useState(false);
    const [isname, setIsName] = useState(false);
    const [isPw, setIsPw] = useState(false);
    const [isPwCon, setIsPwCon] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isNickname, setIsNickname] = useState(false);

    //회원가입 버튼을 눌렀을 때 요청내어줄 회원 정보 전송하는 AXIOS함수
    const succes = () => {
        console.log(Id);
        console.log(Email);
        console.log(Pw);
        console.log(PwCon);
        console.log(name);
        console.log(nickname);
        axios.post("https://i11d107.p.ssafy.io/chestnutApi/member/signup", {
            loginId: Id,
            email: Email,
            password: Pw,
            checkPassword: PwCon,
            memberName: name,
            nickname: nickname,
            birthday: selectedDate,
        })
            .then(response => {
                if (response.data.code == 200) {
                    alert("회원가입에 성공했습니다.");
                    navigate("/member/login");
                } else if (response.data.code == 603) {
                    alert("올바르지 않은 비밀번호 형식입니다.");
                } else if (response.data.code == 604) {
                    alert("비밀번호가 일치하지 않습니다.");
                } else if (response.data.code == 707) {
                    alert("MySQL CRUD 실패");
                } else if (response.data.code == 299) {
                    alert("알 수 없는 오류로 인해 회원가입에 실패했습니다.");
                }
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });

    };

    //생년월일
    const handleDateClick = (date) => {
        setSelectedDate(date);
        console.log("선택된 날짜: ", date);
    }


    //onchange할 때마다 Id변수에 저장시켜줄 기능을 가진 함수
    const inputId = (e) => {
        const currentId = e.target.value;
        setId(currentId);
    };
    //Id 중복검사하는 axios 함수(중복 인증 버튼을 클릭했을 경우)
    const createId = (e) => {
        e.preventDefault(); // 기본 동작 방지
        const currentId = Id;
        axios.get("https://i11d107.p.ssafy.io/chestnutApi/member/check-loginId", {
            params: {
                loginId: currentId // Id 대신 currentId를 사용
            }
        }).then(response => {
            if (response.data.code == 200) {
                setIdMessage("사용가능한 아이디 입니다.");
                setIsId(true);
            } else if (response.data.code == 601) {
                setIdMessage("이미 사용중인 아이디입니다.");
                setIsId(false);
            } else if (response.data.code == 603) {
                setIdMessage("5~15 사이의 대소문자와 숫자로만 작성해주세요.");
                setIsId(false);
            }
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    };

    //비밀번호 생성할 경우 조건(영대소문자, 특수기호, 숫자)를 만족하는 지 체크하는 함수
    const createPw = (e) => {
        const currentPw = e.target.value;
        setPw(currentPw);
        const passwordRegExp=/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if(!passwordRegExp.test(currentPw)){
            setPwMessage("숫자, 영문자, 특수문자 조합으로 8자리 이상 입력해주세요.");
            setIsPw(false);
        }
        else{
            setPwMessage("안전한 비밀번호입니다.");
            setIsPw(true);
        }
    };

    //비밀번호 확인해서 일치하는 지 확인하는 함수
    const createPwCon = (e) => {
        const currentPwCon = e.target.value;
        setPwCon(currentPwCon)
        console.log(Pw)
        if (Pw !== currentPwCon) {
            setPwConMessage("비밀번호가 일치하지 않습니다.");
            setIsPwCon(false);
        } else {
            setPwConMessage("비밀번호가 일치합니다.");
            setIsPwCon(true);

        }
    };
    
    //이메일을 생성해서 인증번호 전송하는 함수(인증 버튼 클릭했을 때)
    const createEmail = (e) => {
        e.preventDefault();
        const currentEmail = Email;
        axios.get("https://i11d107.p.ssafy.io/chestnutApi/member/check-email",{
            params: {
                email: currentEmail,
            }
        })
        .then(response=>{
            if (response.data.code == 200) {
                axios.post("https://i11d107.p.ssafy.io/chestnutApi/member/email/code-request", {
                    email: currentEmail,
                    purpose: "signup",
                })
                    .then(response => {
                        if (response.data.code == 200) {
                            alert("인증번호가 전송되었습니다.");
                            setIsEmail(true);
                        }
                        if (response.data.code == 601) {
                            alert("이미 존재하는 이메일입니다.");
                            setIsEmail(false);
                        } else if (response.data.code == 603) {
                            alert("올바르지 않은 이메일 양식입니다.");
                            setIsEmail(false);
                        } else if (response.data.code == 606) {
                            alert("인증번호 보내는 데 실패했습니다.");
                            setIsEmail(false);
                        } else if (response.data.code == 299) {
                            alert("알 수 없는 오류로 다시 시도하시기 바랍니다.");
                            setIsEmail(false);
                        }
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                    })
                setEmailMessage("사용 가능한 이메일 입니다.");
                setIsEmail(true);
            }
            else if (response.data.code == 601) {
                setEmailMessage("이미 존재하는 이메일입니다.");
                setIsEmail(false);
            }
            console.log(response);
        }).catch(error=>{
            console.log(error);
        })
    };

    //인증번호가 보낸 번호와 일치하는 지 확인하는 함수
    const checkAuth = (e) => {
        e.preventDefault();
        axios.post("https://i11d107.p.ssafy.io/chestnutApi/member/email/code-check", {
            verificationCode: Auth,
        }).then(response => {
            console.log(Auth);
            if (response.data.code == 200) {
                setAuthMessage("인증번호가 일치합니다.");
                setIsAuth(true);
            } else if (response.data.code == 605) {
                setAuthMessage("인증번호가 일치하지 않습니다.");
                setIsAuth(false);
            } else if (response.data.code == 602) {
                setAuthMessage("유효시간 초과로 다시 하셔야 합니다.");
                setIsAuth(false);
            } else if (response.data.code == 299) {
                setAuthMessage("알수 없는 오류로 인해 다시 시도 해주세요.");
                setIsAuth(false);
            }
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    };

    //onchange에 의해 입력되는 인증번호가 Auth변수에 담기는 함수
    const inputAuth = (e) => {
        const currentAuth = e.target.value;
        setAuth(currentAuth);
        console.log(Auth);
    };

    //onchange에 의해 입력되는 이름이 Name변수에 담기는 함수
    const inputName = (e) => {
        const inputname = e.target.value;
        setName(inputname);
    };

    //onchange에 의해 입력되는 이메일이 Email변수에 담기는 함수
    const inputEmail = (e) => {
        const inputemail = e.target.value;
        setEmail(inputemail);
    };

    //닉네임 중복 체크 관련 함수
    const checkname = (e) => {
        e.preventDefault();
        axios.get("https://i11d107.p.ssafy.io/chestnutApi/member/check-nickname", {
            params: {
                nickname: nickname
            }
        })
            .then(response => {
                console.log(response);
                if (response.data.code == 200) {
                    setnickMessage("사용 가능한 닉네임입니다.");
                    setIsNickname(true)

                } else if (response.data.code == 710) {
                    setnickMessage("이미 중복된 닉네임입니다.");
                    setIsNickname(false);
                }
            })
            .catch(error => {
                console.log(error);
            })
    };

    //사용자 이름을 onchange에 의해 입력되는 함수
    const inputname = (e) => {
        const currentname = e.target.value;
        setnickname(currentname);
    };
    //본 디자인 프레임
    return (
        <div className="container">
            <div style={{ paddingTop: 50, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <BackButton work={GotoBack} />
                <div style={{ width: 786, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 22, display: 'flex' }}>
                    <MemberLogo title={'회원가입'} />
                    <div style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 40, paddingBottom: 20, background: '#DCB78F', borderRadius: 25, overflow: 'visible', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 27, display: 'flex' }}>
                        <div style={{ flex: '1 1 0', alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'inline-flex' }}>
                            <InspectionForm content={'ID'} text={IdMessage} name={'중복인증'} work={createId} value={Id} input={inputId} />
                            <SignUpPwInput content={'PW'} text={PwMessage} work={createPw} value={Pw} />
                            <SignUpPwInput content={'PW 재확인'} text={PwConMessage} work={createPwCon} value={PwCon} />
                            <InspectionForm content={'이메일'} text={EmailMessage} name={'인증'} work={createEmail} input={inputEmail} />
                            <InspectionForm content={'인증번호'} name={'확인'} text={AuthMessage} work={checkAuth} value={Auth} input={inputAuth} />
                            <div style={{marginBottom: 25}}>
                                <LoginInputForm content={'이름'} name={name} work={inputName}/>
                            </div>
                            <InspectionForm content={'닉네임'} name={'중복확인'} text={nickMessage} work={checkname} value={nickname} input={inputname} />
                            <div style={{ alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex' }}>
                                {/* <Birth year={'년도'} />
                                <BirthMonth onChange={handleMonthChange} />
                                <BirthDay day={'일'} /> */}
                                <BirthCalendar clickDate={handleDateClick} value={selectedDate}/>
                            </div>
                            <Button button={'회원 가입'} work={succes} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SignUPPage;
