import React from "react";
import LoginButton from "../../atoms/Authentication/LoginButton";
import InspectionForm from "../../molecules/Authentication/InspectionForm";
import MemberLogo from "../../molecules/Authentication/MemberLogo";
import SignUpPwInput from "../../molecules/Authentication/SignUpPwInput";
import InspectionFormNoRed from "../../molecules/Authentication/InspectionForm.noVerRed";
import LoginInputForm from "../../atoms/Authentication/LoginInputForm";
import BackButton from "../../atoms/BackButton";
function SignUPPage(){
    return(
        <div>
            <h1>회원가입페이지</h1>
            <div className="Page">
                <MemberLogo title={'회원가입'} />
                <div style={{width: 786, paddingTop: 42, paddingBottom: 22, paddingLeft: 104, paddingRight: 103, left: 327, top: 229, position: 'absolute', background: '#DCB78F', borderRadius: 25, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 16, display: 'inline-flex'}}>
                        <InspectionForm content={'ID'} text={'6자리 미만으로 입력하시오'} name={'중복인증'}/>
                        <SignUpPwInput content={'PW'} text={'10자리 이상을 입력하시오'} />
                        <SignUpPwInput content={'PW 재확인'} text={'10자리 이상을 입력하시오'} />
                        <InspectionFormNoRed content={'이메일'} name={'인증'}/>
                        <InspectionFormNoRed content={'인증번호'} name={'확인'} />
                        <LoginInputForm content={'이름'} />
                        <InspectionForm content={'닉네임'} name={'중복확인'} text={'이미 존재하는 닉네임입니다.'} />
                        <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex'}}>
                            <div style={{height: 49, padding: 10, background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 5, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                                <div style={{width: 161, height: 29, color: 'black', fontSize: 16, fontFamily: 'Jua', fontWeight: '400', wordWrap: 'break-word'}}>   년(4자)</div>
                            </div>
                            <div style={{height: 49, padding: 10, background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 5, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                                <div style={{width: 161, height: 29, color: 'black', fontSize: 16, fontFamily: 'Jua', fontWeight: '400', wordWrap: 'break-word'}}>   월</div>
                            </div>
                            <div style={{height: 49, padding: 10, background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 5, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                                <div style={{width: 161, height: 29, color: 'black', fontSize: 16, fontFamily: 'Jua', fontWeight: '400', wordWrap: 'break-word'}}>   일</div>
                            </div>
                            <div style={{width: 54, textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Jua', fontWeight: '400', wordWrap: 'break-word'}}>선택사항</div>
                        </div>
                        <LoginButton button={'회원 가입'}/>
                    </div>
                </div>
                <BackButton />
            </div>
        </div>
        
    );
}
export default SignUPPage;