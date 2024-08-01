import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import MemberLogo from "../../molecules/Authentication/MemberLogo";
import LoginIdInput from "../../molecules/Authentication/LoginIdInput";
import Button from "../../molecules/Authentication/Button";
import BackButton from "../../atoms/BackButton";
function FindId(){
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangeEmail =(event)=>{
        setEmail(event.target.value);
    };

    const navigate=useNavigate();
    const succes=()=>{
        if(name=="이재혁" && email=="1234@naver.com"){
            alert("당신의 아이디는 1234입니다.");
            navigate("/member/login");
        }
        else{
            alert("당신의 정보를 잘못 입력하셨습니다.");
        }
        
    };
    const GotoBack=()=>{
        navigate(-1);
    };
    return(
        <div className="container">
            <div style={{padding: 50, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                <BackButton work={GotoBack} />
                <div style={{width: 786, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 22, display: 'flex'}}>
                <MemberLogo title={'ID 찾기'} />
                    <div style={{paddingLeft: 91, paddingRight: 91, paddingTop: 48, paddingBottom: 48, background: '#DCB78F', borderRadius: 25, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 27, display: 'flex'}}>
                        <div style={{height: 246, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 14, display: 'flex'}}>
                        <LoginIdInput title={'ID'} value={name} content={'아이디를 입력하세요'} work={handleChangeName}/>
                        <LoginIdInput title={'이메일'} value={email} content={'이메일을 입력하세요'} work={handleChangeEmail}/>
                        </div>
                        <div style={{height: 108, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 27, display: 'flex'}}>
                            <Button button={'아이디 찾기'} work={succes}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default FindId;