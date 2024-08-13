import React, {useState, useEffect} from "react";
import "./EditMyInfo.css";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import MemberLogo from "../../molecules/Authentication/MemberLogo";
import InspectionForm from "../../molecules/Authentication/InspectionForm";
import Button from "../../molecules/Authentication/Button";
import BackButton from "../../atoms/BackButton";
import PwResetButton from "../../atoms/Authentication/PwResetButton";
import PasswordButton from "../../molecules/Authentication/PasswordButton";
import HiddenForm from "../../organisms/Authentication/hiddenForm";
import NewInputForm from "../../organisms/Authentication/NewInputForm";
import axios from "axios";
import Swal from 'sweetalert2'
import baseApi from "../../api/fetchAPI";
import BirthCalendar from "../../atoms/Authentication/MemberBirth/BirthCalendar";
import moment from "moment";
import LoginIdPwFont from "../../atoms/Authentication/LoginIdPwFont";


function EditMyInfo(){
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [Id, setId] = useState("");
    const [Pw, setPw] = useState("");
    const [PwCon, setPwCon] = useState("");
    const [name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Auth, setAuth] = useState("");
    const [CurPw, setCurPw] = useState("");
    const [nickname, setNickname] = useState("");
    const [birthday, setBirthday] = useState(null);
    const [birth, setBirth] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);


    const [IdMessage, setIdMessage] = useState("");
    const [PwMessage, setPwMessage] = useState("");
    const [PwConMessage, setPwConMessage] = useState("");
    const [nameMessage, setNameMessage] = useState("");
    const [AuthMessage, setAuthMessage] = useState("");
    const [EmailMessage, setEmailMessage] = useState("");
    const [CurPwMessage, setCurPwMessage] = useState("");
    const [nickMessage, setNickMessage] = useState("");

    const [isId, setIsId] = useState(false);
    const [isName, setIsName] = useState(false);
    const [isPw, setIsPw] = useState(false);
    const [isPwCon, setIsPwCon] = useState(false);
    const [isEmail, setIsEmail] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isCurPw, setIsCurPw] = useState(false);
    const [isNickname, setIsNickname] = useState(false);

    const url = "https://i11d107.p.ssafy.io/chestnutApi";

    useEffect(() => {
        baseApi({
            method: 'get',
            url: "/member/info"
        })
        .then(response => {
            if (response.data.code === "200") {
                console.log(response);
                setId(response.data.data.loginId);
                setName(response.data.data.memberName);
                setEmail(response.data.data.email);
                setBirthday(response.data.data.birthday);
                let originalBirthday = response.data.data.birthday;
                console.log("birthday 들어온 값: ", response.data.data?.birthday);
                console.log("들어온 값: ", originalBirthday);
                setNickname(response.data.data.nickname);

                if (originalBirthday) {
                    console.log("birthday는 null이 아니다.")
                    console.log("birthday: ", originalBirthday);
                    setBirth(originalBirthday);
                    console.log("birth: ", birth);
                    const firstDate = new Date(originalBirthday[0], (originalBirthday[1]-1), originalBirthday[2]);
                    setSelectedDate(moment(firstDate).format("YYYY-MM-DD"));
                    console.log("selected date: ", selectedDate);
                } else {
                    console.log("birthday는 null이다")
                    setBirth(null);
                }
            } else if (response.data.code === "801") {
                alert("유효하지 않는 토큰입니다.");
            } else if (response.data.code === "710") {
                alert("db에 정보가 없습니다.");
            } else if (response.data.code === "714") {
                alert("아이디가 존재하지 않습니다.");
            } else {
                alert("계정 권한이 없음");
            }
        })
        .catch(error => {
            console.log(error);
        });
    }, []);


    const GotoBack = () => {
        navigate(-1);
    };

    //생년월일
    const handleDateClick = (date) => {
        setSelectedDate(date);
        console.log("선택된 날짜: ", date);
    }


    const succes = () => {
        const birthdayString = selectedDate !== null ? moment(selectedDate).format("YYYY-MM-DD") : null;

        baseApi({
            method: 'post',
            url: "/member/info",
            data: {
                loginId: Id,
                nickname: nickname,
                memberName: name,
                email: Email,
                birthday: birthdayString
            }
        })
        .then(response => {
            if (response.data.code === "200") {
                Swal.fire({
                    icon: "info",
                    title: "회원정보 수정",
                    text: "회원 정보수정을 완료했습니다."
                });
                navigate("/myprofile/myinfo");
            } else if (response.data.code === "801") {
                alert("유효하지 않은 토큰");
            } else if (response.data.code === "710") {
                alert("DB에 정보 없음");
            } else if (response.data.code === "714") {
                alert("아이디 없음");
            } else if (response.data.code === "299") {
                alert("알 수 없는 오류");
            } else if (response.data.code === "810") {
                alert("계정 권한 없음");
            } else if (response.data.code === "812") {
                alert("계정이 유효하지 않음");
            } else if (response.data.code === "603") {
                alert("부적절한 양식");
            }
        })
        .catch(error => {
            console.log(error);
        });
    };

    const inputEmail = (e) => {
        const currentEmail = e.target.value;
        setEmail(currentEmail);
        const emailRegExp = /^[A-Za-z0-9_]*[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
        if (!currentEmail) {
            setEmailMessage("");
            setIsEmail(false);
        } else if (!emailRegExp.test(currentEmail)) {
            setEmailMessage("이메일 형식이 올바르지 않습니다.")
            setIsEmail(false);
        } else {
            setEmailMessage("")
            setIsEmail(true);
        }
    }

    const inputName = (e) => {
        const currentName = e.target.value;
        setName(currentName);
        const reg = /^[A-Za-z가-힣\s]+$/;

        if (!currentName) {
            setNameMessage("");
            setIsName(false);
        } else if (!reg.test(currentName)) {
            setNameMessage("영문과 한글만 입력 가능합니다.");
            setIsName(false);
        } else {
            setNameMessage("");
            setIsName(true);
        }
    }

    const inputId = (e) => {
        const currentId = e.target.value;
        setId(currentId);
        const idRegExp = /^[a-zA-Z0-9]{5,15}$/;

        if (!currentId) {
            setIdMessage("");
            setIsId(false);
        } else if (!idRegExp.test(currentId)) {
            setIdMessage("5~15 사이의 대소문자와 숫자로만 작성해주세요.");
            setIsId(false);
        } else {
            setIdMessage("");
            setIsId(true);
        }
    };

    const createId = (e) => {
        e.preventDefault();
        const currentId = e.target.value;
        setId(currentId);
        
        axios.get(url+"/member/check-loginId",{
            params: {
                loginId: Id,
            }
        })
        .then(response=>{
            if (response.data.code === "200") {
                console.log("아이디 중복 체크 성공")
                setIdMessage("사용 가능한 아이디입니다.")
                setIsId(true)
            } else if (response.data.code === "601") {
                setIdMessage("이미 존재하는 아이디입니다.");
                setIsId(false);
            } else if (response.data.code === "603") {
                setIdMessage("제출 양식 오류");
                setIsId(false)
            }
        }).catch(error=>{
            console.log(error);
            alert("아이디 확인 중 오류가 발생했습니다.");
        })
    };

    const createPw = (e) => {
        const currentPw = e.target.value;
        setPw(currentPw);
        const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        if (!currentPw) {
            setPwMessage("");
            setIsPw(false);
        } else if (!passwordRegExp.test(currentPw)) {
            setPwMessage("숫자, 영문자, 특수문자 조합으로 8자리 이상 입력해주세요.");
            setIsPw(false);
        } else {
            setPwMessage("");
            setIsPw(true);
        }
    };

    const createPwCon = (e) => {
        const currentPwCon = e.target.value;
        setPwCon(currentPwCon);
        if (!currentPwCon) {
            setPwConMessage("");
            setIsPwCon(false);
        } else if (Pw !== currentPwCon) {
            setPwConMessage("비밀번호가 일치하지 않습니다.");
            setIsPwCon(false);
        } else {
            setPwConMessage("비밀번호가 일치합니다.");
            setIsPwCon(true);
        }
    };

    const checkPw = (e) => {
        const currentPwnow = e.target.value;
        setCurPw(currentPwnow);
        e.preventDefault();
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!isEmail) {
            alert("유효한 이메일 주소를 입력해주세요.");
            return;
        }

        axios.get(url+"/member/check-email",{
            params: {
                email: Email,
            }
        })
        .then(response=>{
            if (response.data.code === "200") {
                console.log("이메일 중복 체크 성공")
                axios.post(url+"/member/email/code-request", {
                    email: Email,
                    purpose: "changeEmail",
                })
                    .then(response => {
                        console.log("이메일 발송")
                        if (response.data.code === "200") {
                            alert("인증 이메일을 발송했습니다. 이메일을 확인해주세요.");
                            setIsEmail(true);
                        }
                        if (response.data.code === "601") {
                            alert("이미 존재하는 이메일입니다.");
                            setIsEmail(false);
                        } else if (response.data.code === "603") {
                            alert("올바르지 않은 이메일 양식입니다.");
                            setIsEmail(false);
                        } else if (response.data.code === "606") {
                            alert("인증번호 보내는 데 실패했습니다.");
                            setIsEmail(false);
                        } else if (response.data.code === "299") {
                            alert("알 수 없는 오류가 발생했습니다.");
                            setIsEmail(false);
                        }
                        console.log(response);
                    })
                    .catch(error => {
                        console.log(error);
                        alert("인증 이메일 발송 중 오류가 발생했습니다.");
                    });
            } else if (response.data.code === "601") {
                setEmailMessage("이미 존재하는 이메일입니다.");
                setIsEmail(false);
            }
        }).catch(error=>{
            console.log(error);
            alert("이메일 확인 중 오류가 발생했습니다.");
        })
    };

    const checkAuth = (e) => {
        e.preventDefault();

        if (!Auth) {
            alert("인증번호를 입력해주세요.");
            return;
        }

        axios.post(url+"/member/email/code-check", {
            email: Email,
            code: Auth,
            purpose:"changeEmail"
        }).then(response => {
            console.log(Auth);
            if (response.data.code === "200") {
                setAuthMessage("인증번호가 일치합니다.");
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

    const inputAuth = (e) => {
        const currentAuth = e.target.value;
        setAuth(currentAuth);
    };

    const checkNickname = (e) => {
        e.preventDefault();
        axios.get(url+"/member/check-nickname", {
            params: {
                nickname: nickname
            }
        })
            .then(response => {
                console.log(response);
                if (response.data.code === "200") {
                    setNickMessage("사용 가능한 닉네임입니다.");
                    setIsNickname(true)

                } else if (response.data.code === "601") {
                    setNickMessage("존재하는 닉네임입니다.");
                    setIsNickname(false);
                } else if (response.data.code === "603") {
                    setNickMessage("잘못된 닉네임 형식입니다.");
                    setIsNickname(false);
                }
            })
            .catch(error => {
                console.log(error);
            })
    };

    const inputNickname = (e) => {
        const currentNickname = e.target.value;
        setNickname(currentNickname);
        const reg = /^[A-Za-z가-힣]{2,20}$/;
        if (!currentNickname) {
            setNickMessage("");
            setIsNickname(false);
        } else if (!reg.test(currentNickname)) {
            setNickMessage("닉네임은 영문, 한글 2자 이상 20자 이하로 작성해주세요.");
            setIsNickname(false);
        } else {
            setNickMessage("");
            setIsNickname(true);
        }
    };

    const inputPw = (e) => {
        const currentPw = e.target.value;
        setCurPw(currentPw);
    };

    const succesPw = (e) => {
        baseApi({
            method: 'post',
            url: "/member/reset-pwd/known",
            data: {
                password: CurPw,
                newPassword: Pw,
                newPasswordCheck: PwCon
            }
        })
        .then(response => {
            if (response.data.code === "200") {
                Swal.fire({
                    icon: "info",
                    title: "비밀번호 재설정",
                    text: "비밀번호 변경을 완료했습니다."
                });
                setCurPw(Pw);
                setModalIsOpen(false);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "비밀번호 재설정",
                    text: "올바르지 않은 양식이거나 정보가 없습니다.",
                });
            }
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
    }


    return(
        <div>
            <div className="container">
                <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                    <BackButton work={GotoBack} />
                    <div style={{width: 786, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 22, display: 'flex', margin: 30}}>
                        <MemberLogo title={'내 정보 수정'} />
                        <div style={{paddingLeft: 40, paddingRight: 40, paddingTop: 40, paddingBottom: 30, background: '#DCB78F', borderRadius: 25, overflow: 'visible', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 27, display: 'flex'}}>
                            <div style={{flex: '1 1 0', alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 16, display: 'inline-flex'}}>
                                <div>
                                    <LoginIdPwFont title={"닉네임"} />
                                    <InspectionForm content={'닉네임 입력하세요'} name={'중복확인'} text={nickMessage} work={checkNickname} value={nickname} input={inputNickname} />
                                </div>
                                <div>
                                    <LoginIdPwFont title={"이름"} />
                                    <InspectionForm content={'이름을 입력하세요'} text={nameMessage} value={name} input={inputName} />
                                </div>
                                <div>
                                    <LoginIdPwFont title={"생년월일"} />
                                    <div style={{ alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex' }}>
                                        <BirthCalendar clickDate={handleDateClick} value={selectedDate}/>
                                    </div>
                                </div>
                                <div>
                                    <LoginIdPwFont title={"아이디"} />
                                    <InspectionForm content={'ID를 입력하세요'} text={IdMessage} name={'중복인증'} work={createId} value={Id} input={inputId} />
                                </div>
                                <div>
                                    <LoginIdPwFont title={"이메일"} />
                                    <HiddenForm name={Email} input={inputEmail} work={handleSubmit} value={Email} value1={Auth} text1={AuthMessage} text={EmailMessage} work1={checkAuth} input1={inputAuth}/>
                                </div>
                                <div style={{marginTop: 10, gap:10, display:"flex", flexDirection: "column", gap:16}}>
                                    <PwResetButton button={'비밀번호 재설정'} work={() => setModalIsOpen(true)}/>
                                    <Button button={'내 정보 수정'} work={succes}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal 
                className="Modal" 
                isOpen={modalIsOpen} 
                onRequestClose={() => setModalIsOpen(false)} 
                shouldCloseOnOverlayClick={true}
                ariaHideApp={false}
            >
                
                <div style={{width: 675, height: 480, borderRadius: 25, justifyContent: 'center', alignItems: 'center', display: 'inline-flex', background: '#DCB78F', display: "flex", flexDirection: "column", paddingTop: 15, paddingBottom: 15}}>
                    <div style={{display:"flex", justifyContent:'flex-end', width:"100%", marginBottom: 10, paddingRight: 20}}>
                        <div className="pw-modal-close" onClick={() => setModalIsOpen(false)}></div>
                    </div>
                    <div style={{flex: '1 1 0', gap:20, alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex', paddingBottom: 20}}>
                        <div style={{alignSelf: 'stretch', background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
                            <NewInputForm title={'현재 비밀번호'} content={'현재 비밀번호를 입력하세요'} value={CurPw} work={checkPw} text={CurPwMessage}/>  
                        </div>
                        <div style={{alignSelf: 'stretch', background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
                            <NewInputForm title={'새 비밀번호'} content={'새 비밀번호를 입력하세요'} value={Pw} work={createPw} text={PwMessage}/>
                        </div>
                        <div style={{alignSelf: 'stretch', background: 'rgba(255, 249, 239, 0)', flexDirection: 'flex-start', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
                            <NewInputForm title={'비밀번호 확인'} content={'새 비밀번호를 입력하세요'} value={PwCon} work={createPwCon} text={PwConMessage}/>
                        </div> 
                        <PasswordButton button={'PW 재설정'} work={succesPw} classname={"Buttton"}/>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
export default EditMyInfo;