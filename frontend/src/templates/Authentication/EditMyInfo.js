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
import LoginButton from "../../atoms/Authentication/LoginButton";
import BackButton from "../../atoms/BackButton";
import PwResetButton from "../../atoms/Authentication/PwResetButton";

import PasswordButton from "../../molecules/Authentication/PasswordButton";
import HiddenForm from "../../organisms/Authentication/hiddenForm";
import LoginPwInput from "../../molecules/Authentication/LoginPwInput"
function EditMyInfo(){
    const navigate=useNavigate();
    const GotoBack=()=>{
        navigate(-1);
    };
    const succes=()=>{
        navigate("/myprofile");
    };
    const [modalIsOpen, setModalIsOpen] = useState(false);
    return(
        <div>
            <div className="Page">
                <MemberLogo title={'내 정보 수정'} />
                <div style={{width: 786, paddingTop: 42, paddingBottom: 22, paddingLeft: 104, paddingRight: 103, left: 327, top: 229, position: 'absolute', background: '#DCB78F', borderRadius: 25, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', alignSelf: 'stretch', paddingTop: 56, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 16, display: 'inline-flex'}}>
                        <InspectionForm content={'왕밤빵'} name={'중복확인'} text={'이미 존재하는 닉네임입니다.'} />
                        <LoginInputForm content={'이병헌'} />
                        <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex'}}>
                            <Birth year={1987}/>
                            <BirthMonth month={5}/>
                            <BirthDay day={21}/>
                        </div>
                        <InspectionForm content={'1245k'} text={'6자리 미만으로 입력하시오'} name={'중복인증'}/>
                        <HiddenForm name={'1234@gmail.com'}/>
                        <PwResetButton button={'비밀번호 재설정'} work={()=>setModalIsOpen(true)}/>
                        <LoginButton button={'내 정보 수정'} work={succes}/>
                    </div>
                </div>
                <Modal className="Modal" isOpen={modalIsOpen} onRequestClose={()=>setModalIsOpen(false)} shouldCloseOnOverlayClick={false}>
                    <div>
                        <div style={{flex: '1 1 0', alignSelf: 'stretch', paddingTop: 50, paddingLeft: 40, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                            <div style={{alignSelf: 'stretch', background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                                <LoginPwInput title={'새 비밀번호'} content={'비밀번호를 입력하세요'} />
                            </div>
                            <div style={{alignSelf: 'stretch', background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                                <LoginPwInput title={'비밀번호 확인'} content={'비밀번호를 입력하세요'} />
                            </div> 
                            <div><PasswordButton button={'PW 재설정'} work={succes} classname={"modalButton"}/></div>
                            
                        </div>
                    </div>
                    
                </Modal>
                <BackButton work={GotoBack}/>
            </div>
        </div>
    );
}
export default EditMyInfo;