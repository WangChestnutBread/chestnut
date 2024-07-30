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
            navigate("/login");
        }
        else{
            alert("당신의 정보를 잘못 입력하셨습니다.");
        }
        
    };
    const GotoBack=()=>{
        navigate(-1);
    };
    return(
        <div className="Page">
            <MemberLogo title={'ID 찾기'} />
            <div style={{width: 786, height: 630, left: 327, top: 232, position: 'absolute', background: '#DCB78F', borderRadius: 25, overflow: 'hidden'}}>
                <div style={{height: 246, left: 92, top: 122, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 14, display: 'inline-flex'}}>
                    <LoginIdInput title={'이름'} content={'이름을 입력하세요'} value={name} work={handleChangeName}/>
                    <LoginIdInput title={'이메일'} content={'이메일을 입력하세요'} value={email} work={handleChangeEmail}/>
                </div>
                <Button button={'아이디 찾기'} work={succes}/>
            </div>
            <BackButton work={GotoBack}/>
        </div>
    );
}
export default FindId;