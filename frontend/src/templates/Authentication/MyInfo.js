import React from "react";
import { useNavigate } from "react-router-dom";
import MemberLogo from "../../molecules/Authentication/MemberLogo";
import BackButton from "../../atoms/BackButton";
import Button from "../../molecules/Authentication/Button";
import PasswordButton from "../../molecules/Authentication/PasswordButton";
import InfoBox from "../../molecules/Authentication/InfoBox";
import ProfileButton from "../../molecules/Authentication/ProfileButton";
import BirthInfo from "../../atoms/Authentication/MemberBirth/BirthInfo";
import LoginIdPwFont from "../../atoms/Authentication/LoginIdPwFont";
function MyInfo(){
    const navigate = useNavigate();
    const navigateToPurchase = ()=>{
        navigate("/myprofile/edit");
    };
    const GotoBack=()=>{
        navigate(-1);
    };
    return(
        <div>
            <MemberLogo title={'내정보'} />
            <div style={{width: 786, height: 667, paddingTop: 50, paddingBottom: 58, paddingLeft: 92, left: 327, top: 240, position: 'absolute', background: '#DCB78F', borderRadius: 25, overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'inline-flex'}}>
                <div style={{height: 574, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
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
                    <div style={{alignSelf: 'stretch', paddingLeft: 100, paddingRight: 100, paddingTop: 10, paddingBottom: 10, justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                        <ProfileButton button={'내 정보 수정'} work={navigateToPurchase}/>
                    </div>
                </div>
            </div>
    <BackButton work={GotoBack}/>
</div>
    );
}
export default MyInfo;