import React, {useState} from "react";
import "./EditMyInfo.css";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import MemberLogo from "../../molecules/Authentication/MemberLogo";
import InspectionForm from "../../molecules/Authentication/InspectionForm";
import LoginInputForm from "../../atoms/Authentication/LoginInputForm";
import Birth from "../../atoms/Authentication/MemberBirth/Birth";
import BirthMonth from "../../atoms/Authentication/MemberBirth/BirthMonth";
import BirthDay from "../../atoms/Authentication/MemberBirth/BirthDay";
import Button from "../../molecules/Authentication/Button";
import BackButton from "../../atoms/BackButton";
import PwResetButton from "../../atoms/Authentication/PwResetButton";
import PasswordButton from "../../molecules/Authentication/PasswordButton";
import HiddenForm from "../../organisms/Authentication/hiddenForm";
import NewInputForm from "../../organisms/Authentication/NewInputForm";
import FindIdForm from "../../organisms/Authentication/FindIdForm";
import axios from "axios";
import Swal from 'sweetalert2'
import baseApi from "../../api/fetchAPI";

function EditMyInfo(){
    const navigate=useNavigate();
    const GotoBack=()=>{
        navigate(-1);
    };
    const succes=()=>{
        axios.post("https://i11d107.p.ssafy.io/chestnutApi/member/info",{
            loginId: Id,
            nickname: nickname,
            memberName: name,
            email: Email,
            birthday: `${birth[0]}}-${birth[1]}-${birth[2]}`
        })
        .then(response=>{
            if(response.data.code==200){
                Swal.fire({
                    icon: "info",
                    title: "회원정보 수정",
                    text: "회원 정보수정을 완료했습니다."
                });
                navigate("/myprofile/myinfo");
            }
            else if(response.data.code==801){
                alert("유효하지 않은 토큰");
            }
            else if(response.data.code==710){
                alert("DB에 정보 없음");
            }
            else if(response.data.code==714){
                alert("아이디 없음");
            }
            else if(response.data.code==299){
                alert("알 수 없는 오류");
            }
            else if(response.data.code==810){
                alert("계정 권한 없음");
            }
            else if(response.data.code==812){
                alert("계정이 유효하지 않음");
            }
            else if(response.data.code==603){
                alert("부적절한 양식");
            }
        })
        .catch(error=>{
            console.log(error);
        })
        
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [Id, setId]=useState("pingu");
    const [Pw, setPw]=useState("");
    const [PwCon, setPwCon]=useState("");
    const [name, setName]=useState("김키티");
    const [Email, setEmail]=useState("124@naver.com");
    const [Auth, setAuth]=useState("");
    const [CurPw, setCurPw]=useState("");
    const [nickname, setnickname]=useState("밤톨이");
    const [birthday, setBirthday]=useState("2024-08-02");
    const birth=birthday.split(["-"])

    const [IdMessage, setIdMessage]=useState("");
    const [PwMessage, setPwMessage]=useState("");
    const [PwConMessage, setPwConMessage]=useState("");
    const [nameMessage, setNameMessage]=useState("");
    const [AuthMessage, setAuthMessage]=useState("");
    const [EmailMessage, setEmailMessage]=useState("");
    const [CurPwMessage, setCurPwMessage]=useState("");
    const [nickMessage, setnickMessage]=useState("");

    const [isId, setIsId]=useState(false);
    const [isname, setIsName]=useState(false);
    const [isPw, setIsPw]=useState(false);
    const [isPwCon, setIsPwCon]=useState(false);
    const [isEmail, setIsEmail]=useState(false);
    const [isAuth, setIsAuth]=useState(false);
    const [isCurPw, setIsCurPw]=useState(false);
    const [isNickname, setIsNickname]=useState(false);

    const inputEmail=(e)=>{
        const currentEmail=e.target.value;
        setEmail(currentEmail);
    }
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
            console.log(IdMessage)
        }
        else if(Id == "ssafy123"){
            setIdMessage("이미 사용중인 ID입니다.")
            setIsId(false);
        }
        else{
            setIdMessage("사용가능한 아이디 입니다.");
            setIsId(true);
        }
        e.preventDefault();
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
        setPwCon(currentPwCon);
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

    const checkPw=(e)=>{
        const currentPwnow=e.target.value;
        setCurPw(currentPwnow);
        console.log(CurPw)
        if(CurPw !== "ssafy"){
            setCurPwMessage("비밀번호가 일치하지 않습니다.");
            setIsCurPw(false);
        }
        else{
            setCurPwMessage("비밀번호가 일치합니다.");
            setIsCurPw(true);
        }
        e.preventDefault();
    };

    const createEmail=(e) =>{
        const emailRegExp=/^[A-Za-z0-9_]*[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
        if(!emailRegExp.test(Email)){
            setEmailMessage("이메일 형식이 올바르지 않습니다.")
            setIsEmail(false);
        }
        else{
            setEmailMessage("사용 가능한 이메일 입니다.")
            setIsEmail(true);
        }
        e.preventDefault();
    };
    const handleSubmit = (event) => {
        alert("인증번호를 전송했습니다.");
        event.preventDefault();
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

    const inputAuth = (e) => {
        const currentAuth = e.target.value;
        setAuth(currentAuth);
    };

    const checkname=(e)=>{
        if (nickname == "ssafy") {
            setnickMessage("이미 사용중인 닉네임입니다.");
            setIsNickname(false);
        } else {
            setnickMessage("사용 가능한 닉네임입니다.");
            setIsNickname(true);
        }
        e.preventDefault();
    };
    const inputname=(e)=>{
        const currentname=e.target.value;
        setnickname(currentname);
    };
    const inputPw=(e)=>{
        const currentPw=e.target.value;
        setCurPw(currentPw);
    };

    const succesPw=(e)=>{
        axios.post("https://i11d107.p.ssafy.io/chestnutApi/member/reset-pwd/known",{
            password: CurPw,
            newPassword: Pw,
            newPasswordCheck: PwCon
        })
        .then(response=>{
            if(response.data.code==200){
                Swal.fire({
                    icon: "info",
                    title: "비밀번호 재설정",
                    text: "비밀번호 변경을 완료했습니다."
                });
                setCurPw(Pw);

            }
            else{
                Swal.fire({
                    icon: "error",
                    title: "비밀번호 재설정",
                    text: "올바르지 않은 양식이거나 정보가 없습니다.",
                });
            }
            console.log(response);
        }).catch(error=>{
            console.log(error);
        })
    }

    baseApi({
        method: 'get',
        url: "/member/info"
    })
    .then(response=>{
        if(response.data.code==200){
            console.log(response);
            setId(response.data.data.loginId); 
            setName(response.data.data.memberName);
            setEmail(response.data.data.email);
            setBirthday(response.data.data.birthday);
            setnickname(response.data.data.nickname);
        }
        else if(response.data.code==801){
            alert("유용하지 않는 토큰입니다.");
        }
        else if(response.data.code==710){
            alert("db에 정보가 없습니다.");
        }
        else if(response.data.code==714){
            alert("아이디가 존재하지 않습니다.");
        }
        else if(response.data.code){
            alert("계정 권한이 없음");
        }
    })
    .catch(error=>{
        console.log(error);
    })
    .catch(error=>{
        if(error.code==801){
            alert("유효하지 않는 토큰입니다.");
        }
        else if(error.code==710){
            alert("DB에 저장된 데이터가 없습니다.");
        }
        else if(error.code==714){
            alert("아이디가 없습니다.");
        }
    });

    return(
        <div>
            <div className="container">
                <div style={{paddingTop: 50, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                    <BackButton work={GotoBack} />
                    <div style={{width: 786, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 22, display: 'flex'}}>
                    <MemberLogo title={'내 정보 수정'} />
                        <div style={{paddingLeft: 91, paddingRight: 91, paddingTop: 48, paddingBottom: 48, background: '#DCB78F', borderRadius: 25, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 27, display: 'flex'}}>
                            <div style={{flex: '1 1 0', alignSelf: 'stretch', paddingTop: 56, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 16, display: 'inline-flex'}}>
                                <InspectionForm content={'닉네임 입력하세요'} name={'중복확인'} text={nickMessage} work={checkname} value={nickname} input={inputname} />
                                <LoginInputForm content={'이름을 입력하세요'} name={name}/>
                                <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex'}}>
                                    <Birth year={birth[0]}/>
                                    <BirthMonth month={birth[1]}/>
                                    <BirthDay day={birth[2]}/>
                                </div>
                                <InspectionForm content={'ID를 입력하세요'} text={IdMessage} name={'중복인증'} work={createId} value={Id} input={inputId} />
                                <HiddenForm name={Email} input={inputEmail} work={createEmail} value={Email} value1={Auth} text1={AuthMessage} work1={checkAuth} input1={inputAuth}/>
                                <PwResetButton button={'비밀번호 재설정'} work={()=>setModalIsOpen(true)}/>
                                <Button button={'내 정보 수정'} work={succes}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal className="Modal" isOpen={modalIsOpen} onRequestClose={()=>setModalIsOpen(false)} shouldCloseOnOverlayClick={false}>
                <div style={{width: 700, height: 500, borderRadius: 25, justifyContent: 'center', alignItems: 'center', display: 'inline-flex', background: '#DCB78F'}}>
                    <div style={{flex: '1 1 0', alignSelf: 'stretch', paddingTop: 50, paddingLeft: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                        <div style={{alignSelf: 'stretch', background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
                            <FindIdForm title={'현재 비밀번호'}content={'현재 비밀번호를 입력하세요'} name={'확인'} text={CurPwMessage} work={checkPw} value={CurPw} input={inputPw} />  
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