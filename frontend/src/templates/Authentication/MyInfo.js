import React from "react";
import { useNavigate } from "react-router-dom";
import MemberLogo from "../../molecules/Authentication/MemberLogo";
import BackButton from "../../atoms/BackButton";
import Button from "../../molecules/Authentication/Button";
import InfoBox from "../../molecules/Authentication/InfoBox";
import BirthInfo from "../../atoms/Authentication/MemberBirth/BirthInfo";
import LoginIdPwFont from "../../atoms/Authentication/LoginIdPwFont";
import axios from "axios";
function MyInfo(){
    axios.get("https://i11d107.p.ssafy.io/chestnutApi/member/info",{
        params: {
            "Authorization": `Bearer {accessToken}`,
        }
    })
    .then(response=>{
        console.log(response);
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
                        <InfoBox title={'닉네임'} name={'밤톨이'} />
                        </div>
                        <div style={{alignSelf: 'stretch', height: 102, padding: 10, background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                            <InfoBox title={'이름'} name={'이병헌'} />
                        </div>
                        <div style={{height: 100, padding: 10, background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                            <LoginIdPwFont title={'생년월일'} />
                            <div style={{width: 582, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                                <BirthInfo value={1987} />
                                <BirthInfo value={5} />
                                <BirthInfo value={21} />
                                <LoginIdPwFont title={'선택사항'} />
                            </div>
                        </div>
                        <div style={{alignSelf: 'stretch', height: 102, padding: 10, background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                            <InfoBox title={'이메일'} name={'bamtol@example.com'} />
                        </div>
                        <div style={{alignSelf: 'stretch', height: 102,padding: 10, background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                            <InfoBox title={'ID'} name={'1245K'} />
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