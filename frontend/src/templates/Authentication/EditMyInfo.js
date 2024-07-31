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
function EditMyInfo(){
    const navigate=useNavigate();
    const GotoBack=()=>{
        navigate(-1);
    };
    const succes=()=>{
        navigate("/myprofile/myinfo");
    };
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [Id, setId]=useState("");
    const [Pw, setPw]=useState("");
    const [PwCon, setPwCon]=useState("");
    const [name, setName]=useState("");
    const [Email, setEmail]=useState("");
    const [Auth, setAuth]=useState("");

    const [IdMessage, setIdMessage]=useState("");
    const [PwMessage, setPwMessage]=useState("");
    const [PwConMessage, setPwConMessage]=useState("");
    const [nameMessage, setNameMessage]=useState("");
    const [AuthMessage, setAuthMessage]=useState("");
    const [EmailMessage, setEmailMessage]=useState("");

    const [isId, setIsId]=useState(false);
    const [isname, setIsName]=useState(false);
    const [isPw, setIsPw]=useState(false);
    const [isPwCon, setIsPwCon]=useState(false);
    const [isEmail, setIsEmail]=useState(false);
    const [isAuth, setIsAuth]=useState(false);
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
        else if(Id == "1234"){
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

    const createEmail=(e) =>{
        const currentEmail=e.target.value;
        setEmail(currentEmail);
        const emailRegExp=/^[A-Za-z0-9_]*[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
        if(!emailRegExp.test(currentEmail)){
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
        if (name == "ssafy") {
            setNameMessage("이미 사용중인 닉네임입니다.");
            setIsName(false);
        } else {
            setNameMessage("사용 가능한 닉네임입니다.");
            setIsName(true);
        }
        e.preventDefault();
    };
    const inputname=(e)=>{
        const currentname=e.target.value;
        setName(currentname);
    };
    return(
        <div>
            <div className="container">
                <div style={{paddingTop: 50, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                    <BackButton work={GotoBack} />
                    <div style={{width: 786, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 22, display: 'flex'}}>
                    <MemberLogo title={'내 정보 수정'} />
                        <div style={{paddingLeft: 91, paddingRight: 91, paddingTop: 48, paddingBottom: 48, background: '#DCB78F', borderRadius: 25, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 27, display: 'flex'}}>
                            <div style={{flex: '1 1 0', alignSelf: 'stretch', paddingTop: 56, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 16, display: 'inline-flex'}}>
                                <InspectionForm content={'왕밤빵'} name={'중복확인'} text={nameMessage} work={checkname} value={name} input={inputname} />
                                <LoginInputForm content={'이병헌'} />
                                <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex'}}>
                                    <Birth year={1987}/>
                                    <BirthMonth month={5}/>
                                    <BirthDay day={21}/>
                                </div>
                                <InspectionForm content={'1245k'} text={IdMessage} name={'중복인증'} work={createId} value={Id} input={inputId} />
                                <HiddenForm name={'1234@gmail.com'} input={createEmail} work={handleSubmit} value={Email} value1={Auth} text1={AuthMessage} work1={checkAuth} input1={inputAuth}/>
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
                            <NewInputForm title={'새 비밀번호'} content={'비밀번호를 입력하세요'} value={Pw} work={createPw} text={PwMessage}/>
                        </div>
                        <div style={{alignSelf: 'stretch', background: 'rgba(255, 249, 239, 0)', flexDirection: 'flex-start', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex'}}>
                            <NewInputForm title={'비밀번호 확인'} content={'비밀번호를 입력하세요'} value={PwCon} work={createPwCon} text={PwConMessage}/>
                        </div> 
                        <PasswordButton button={'PW 재설정'} work={succes} classname={"Buttton"}/>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
export default EditMyInfo;