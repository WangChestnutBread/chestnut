import React,{useState } from "react";
import { useNavigate } from "react-router-dom";
import InspectionForm from "../../molecules/Authentication/InspectionForm";
import MemberLogo from "../../molecules/Authentication/MemberLogo";
import SignUpPwInput from "../../molecules/Authentication/SignUpPwInput";
import LoginInputForm from "../../atoms/Authentication/LoginInputForm";
import BackButton from "../../atoms/BackButton";
import Birth from "../../atoms/Authentication/MemberBirth/Birth";
import BirthMonth from "../../atoms/Authentication/MemberBirth/BirthMonth";
import BirthDay from "../../atoms/Authentication/MemberBirth/BirthDay";
import Button from "../../molecules/Authentication/Button";
import axios from "axios";
function SignUPPage(){
    const navigate = useNavigate();
    const succes=()=>{
        axios.post("https://i11d107.p.ssafy.io/chestnutApi/member/signup",{
            "loginId": Id,
            "email": Email,
            "password": Pw,
            "checkPassword": PwCon,
            "name": name,
            "nickname": nickname,
            "birthday": "2024-08-01",
        })
        .then(response=>{
            if(response.data.code==200){
                alert("회원가입에 성공했습니다.");
                navigate("/member/login");
            }
            else if(response.data.code==603){
                alert("올바르지 않은 비밀번호 형식입니다.");
            }
            else if(response.data.code==604){
                alert("비밀번호가 일치하지 않습니다.");
            }
            else if(response.data.code==707){
                alert("MySQL CRUD 실패");
            }
            else if(response.data.code==299){
                alert("알 수 없는 오류로 인해 회원가입에 실패했습니다.");
            }
            console.log(response);
        })
        .catch(error=>{
            console.log(error);
        })
        
    };
    const GotoBack=()=>{
        navigate(-1);
    };

    const [Id, setId]=useState("");
    const [Pw, setPw]=useState("");
    const [PwCon, setPwCon]=useState("");
    const [name, setName]=useState("");
    const [Email, setEmail]=useState("");
    const [Auth, setAuth]=useState("");
    const [nickname, setnickname]=useState("");

    const [IdMessage, setIdMessage]=useState("");
    const [PwMessage, setPwMessage]=useState("");
    const [PwConMessage, setPwConMessage]=useState("");
    const [nameMessage, setNameMessage]=useState("");
    const [EmailMessage, setEmailMessage]=useState("");
    const [AuthMessage, setAuthMessage]=useState("");
    const [nickMessage, setnickMessage]=useState("");

    const [isId, setIsId]=useState(false);
    const [isname, setIsName]=useState(false);
    const [isPw, setIsPw]=useState(false);
    const [isPwCon, setIsPwCon]=useState(false);
    const [isEmail, setIsEmail]=useState(false);
    const [isAuth, setIsAuth]=useState(false);
    const [isNickname, setIsNickname]=useState(false);
    const inputId=(e)=>{
        const currentId=e.target.value;
        setId(currentId);
    };
    const createId = (e)=>{
        const currentId=e.target.value;
        setId(currentId);
        const idRegExp=/^[a-zA-Z0-9]{5,15}$/;
        if(!idRegExp.test(currentId)){
            setIdMessage("5~15 사이의 대소문자와 숫자로만 작성해주세요.");
            setIsId(false);
        }
        else{
            setIdMessage("사용가능한 아이디 입니다.");
            setIsId(true);
        }
        e.preventDefault();
        axios.get("https://i11d107.p.ssafy.io/chestnutApi/member/check-loginId",{
            params: {
                "lgoinId": Id
            }
        }).then(response=>{
            if(response.data.code==200){
                setIdMessage("사용가능한 아이디 입니다.");
                setIsId(true)
            }
            else if(response.data.code==601){
                setIdMessage("이미 사용중인 아이디입니다.");
                setIsId(false);
            }
            else if(response.data.code==603){
                setIdMessage("5~15 사이의 대소문자와 숫자로만 작성해주세요.");
                setIsId(false);
            }
            console.log(response);
        }).catch(error=>{
            console.log(error);
        });
    };

    const createPw=(e)=>{
        const currentPw=e.target.value;
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

    const createPwCon=(e)=>{
        const currentPwCon=e.target.value;
        setPwCon(currentPwCon)
        console.log(Pw)
        if(Pw !== currentPwCon){
            setPwConMessage("비밀번호가 일치하지 않습니다.");
            setIsPwCon(false);
        }
        else{
            setPwConMessage("비밀번호가 일치합니다.");
            setIsPwCon(true);

        }
    };

    const createEmail = (e) => {
        const currentEmail = e.target.value;
        setEmail(currentEmail);

        // const emailRegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        // if (!emailRegExp.test(Email)) {
        //     setEmailMessage("이메일 형식이 올바르지 않습니다.");
        //     setIsEmail(false);
        // } else {
        //     setEmailMessage("사용 가능한 이메일 입니다.");
        //     setIsEmail(true);
        // }
        e.preventDefault();
        axios.post("https://i11d107.p.ssafy.io/chestnutApi/member/email/verification-request",{
            "email": Email
        })
        .then(response=>{
            if(response.data.code==200){
                setEmailMessage("인증번호가 전송되었습니다.");
                setIsEmail(true);
            }
            if(response.data.code==601){
                setEmailMessage("이미 존재하는 이메일입니다.");
                setIsEmail(false);
            }
            else if(response.data.code==603){
                setEmailMessage("올바르지 않은 이메일 양식입니다.");
                setIsEmail(false);
            }
            else if(response.data.code==606){
                setEmailMessage("인증번호 보내는 데 실패했습니다.");
                setIsEmail(false);
            }
            else if(response.data.code==299){
                setEmailMessage("알 수 없는 오류로 다시 시도하시기 바랍니다.");
                setIsEmail(false);
            }
            console.log(response);
        })
        .catch(error=>{
            console.log(error);
        })
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
        axios.post("https://i11d107.p.ssafy.io/chestnutApi/member/email/verification-check",{
            "verificationCode" : Auth
        }).then(response=>{
            if(response.data.code==200){
                setAuthMessage("인증번호가 일치합니다.");
                setIsAuth(true);
            }
            else if(response.data.code==605){
                setAuthMessage("인증번호가 일치하지 않습니다.");
                setIsAuth(false);
            }
            else if(response.data.code==602){
                setAuthMessage("유효시간 초과로 다시 하셔야 합니다.");
                setIsAuth(false);
            }
            else if(response.data.code==299){
                setAuthMessage("알수 없는 오류로 인해 다시 시도 해주세요.");
                setIsAuth(false);
            }
            console.log(response);
        }).catch(error=>{
            console.log(error);
        })
    };

    const inputAuth = (e) => {
        const currentAuth = e.target.value;
        setAuth(currentAuth);
    };

    const checkname=(e)=>{
        // if (nickname == "ssafy") {
        //     setNameMessage("이미 사용중인 닉네임입니다.");
        //     setIsName(false);
        // } else {
        //     setNameMessage("사용 가능한 닉네임입니다.");
        //     setIsName(true);
        // }
        e.preventDefault();
        axios.get("https://i11d107.p.ssafy.io/chestnutApi/member/check-nickname", {
            params: {
                "nickname": nickname
            }
        })
        .then(response=>{
            console.log(response);
            if(response.data.code==200){
                setnickMessage("사용 가능한 닉네임입니다.");
                setIsNickname(true)
                
            }
            else if(response.data.code==710){
                setnickMessage("이미 중복된 닉네임입니다.");
                setIsNickname(false);
            }
        })
        .catch(error=>{
            console.log(error);
        })
    };
    const inputname=(e)=>{
        const currentname=e.target.value;
        setnickname(currentname);
    };

    return(
        <div className="container">
            <div style={{paddingTop: 50, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                <BackButton work={GotoBack} />
                <div style={{width: 786, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 22, display: 'flex'}}>
                <MemberLogo title={'회원가입'} />
                    <div style={{paddingLeft: 91, paddingRight: 91, paddingTop: 48, paddingBottom: 48, background: '#DCB78F', borderRadius: 25, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 27, display: 'flex'}}>
                        <div style={{flex: '1 1 0', alignSelf: 'stretch', paddingTop: 56, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 16, display: 'inline-flex'}}>
                            <InspectionForm content={'ID'} text={IdMessage} name={'중복인증'} work={createId} value={Id} input={inputId}/>
                            <SignUpPwInput content={'PW'} text={PwMessage} work={createPw} value={Pw}/>
                            <SignUpPwInput content={'PW 재확인'} text={PwConMessage} work={createPwCon} value={PwCon}/>
                            <InspectionForm content={'이메일'} text={EmailMessage} name={'인증'} work={createEmail}/>
                            <InspectionForm content={'인증번호'} name={'확인'} text={AuthMessage} work={checkAuth} value={Auth} input={inputAuth}/>
                            <LoginInputForm content={'이름'} />
                            <InspectionForm content={'닉네임'} name={'중복확인'} text={nickMessage} work={checkname} value={nickname} input={inputname} />
                            <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex'}}>
                                <Birth year={'년도'}/>
                                <BirthMonth month={'월'}/>
                                <BirthDay day={'일'}/>
                            </div>
                            <Button button={'회원 가입'} work={succes}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SignUPPage;