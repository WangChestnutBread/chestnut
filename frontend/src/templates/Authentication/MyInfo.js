import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import MemberLogo from "../../molecules/Authentication/MemberLogo";
import BackButton from "../../atoms/BackButton";
import Button from "../../molecules/Authentication/Button";
import InfoBox from "../../molecules/Authentication/InfoBox";
import BirthInfo from "../../atoms/Authentication/MemberBirth/BirthInfo";
import LoginIdPwFont from "../../atoms/Authentication/LoginIdPwFont";
import axios from "axios";
function MyInfo(){
    const [Id, setId]=useState("pingu");
    const [Pw, setPw]=useState("");
    const [PwCon, setPwCon]=useState("");
    const [name, setName]=useState("김키티");
    const [Email, setEmail]=useState("124@naver.com");
    const [Auth, setAuth]=useState("");
    const [nickname, setnickname]=useState("밤톨이");
    const [birthday, setBirthday]=useState("2024-08-02");
    const birth=birthday.split(["-"])
    
    axios.get("https://i11d107.p.ssafy.io/chestnutApi/member/info",{
        params: {
            "Authorization": `Bearer {accessToken}`,
        }
    })
    .then(response=>{
        if(response.data.code==200){
            console.log(response);
            setId(response.data.loginId); 
            setName(response.data.memberName);
            setEmail(response.data.email);
            setBirthday(response.data.birthday);
            setnickname(response.data.nickname);
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
    const navigate = useNavigate();
    const navigateToPurchase = ()=>{
        navigate("/myprofile/edit");
    };
    const GotoBack=()=>{
        navigate(-1);
    };
    return(
        <div className="container">
            <div style={{paddingTop: 50, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                <BackButton work={GotoBack} />
                <div style={{width: 786, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 22, display: 'flex'}}>
                <MemberLogo title={'내정보'} />
                    <div style={{paddingLeft: 91, paddingRight: 91, paddingTop: 48, paddingBottom: 48, background: '#DCB78F', borderRadius: 25, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 27, display: 'flex'}}>
                    <div style={{alignSelf: 'stretch', height: 92, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                        <InfoBox title={'닉네임'} name={nickname} />
                        </div>
                        <div style={{alignSelf: 'stretch', height: 102, padding: 10, background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                            <InfoBox title={'이름'} name={name} />
                        </div>
                        <div style={{height: 100, padding: 10, background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                            <LoginIdPwFont title={'생년월일'} />
                            <div style={{width: 582, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                                <BirthInfo value={birth[0]} />
                                <BirthInfo value={birth[1]} />
                                <BirthInfo value={birth[2]} />
                                <LoginIdPwFont title={'선택사항'} />
                            </div>
                        </div>
                        <div style={{alignSelf: 'stretch', height: 102, padding: 10, background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                            <InfoBox title={'이메일'} name={Email} />
                        </div>
                        <div style={{alignSelf: 'stretch', height: 102,padding: 10, background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                            <InfoBox title={'ID'} name={Id} />
                        </div>
                        <div style={{height: 108, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 27, display: 'flex'}}>
                            <Button button={'내 정보 수정'} work={navigateToPurchase}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MyInfo;