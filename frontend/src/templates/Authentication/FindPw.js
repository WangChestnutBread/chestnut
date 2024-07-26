import React from "react";
import PasswordButton from "../../molecules/Authentication/PasswordButton";
import MemberLogo from "../../molecules/Authentication/MemberLogo";
import FindIdForm from "../../organisms/Authentication/FindIdForm";
import LoginIdInput from "../../molecules/Authentication/LoginIdInput";
import BackButton from "../../atoms/BackButton";
function FindPw(){
    return(
        <div style={{width: '100%', height: '100%', position: 'relative', background: '#FFF9EF'}}>
            <MemberLogo title={'PW찾기'} />
            <div style={{width: 786, paddingTop: 18, paddingBottom: 56, paddingLeft: 92, paddingRight: 92, marginBottom: 20, left: 327, top: 250, position: 'absolute', background: '#DCB78F', borderRadius: 25, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                <div style={{flex: '1 1 0', alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', display: 'inline-flex'}}>
                    <div style={{alignSelf: 'stretch', background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                        <LoginIdInput title={'ID'} content={'아이디를 입력하세요'} />
                    </div>
                    <div style={{alignSelf: 'stretch', padding: 10, background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                        <FindIdForm title={'이메일'} content={'이메일을 입력하세요'} name={'전송'} />
                    </div>
                    <div style={{alignSelf: 'stretch', padding: 10, background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                        <FindIdForm title={'인증번호'} content={'인증번호를 입력하세요'} name={'확인'} />
                    </div>
                    <div style={{alignSelf: 'stretch', background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                        <LoginIdInput title={'새 비밀번호'} content={'비밀번호를 입력하세요'} />
                    </div>
                    <div style={{alignSelf: 'stretch', background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                        <LoginIdInput title={'비밀번호 확인'} content={'비밀번호를 입력하세요'} />
                    </div>
                </div>
                <PasswordButton button={'PW 찾기'}/>
            </div> 
            <BackButton />
        </div>
    );
}
export default FindPw;