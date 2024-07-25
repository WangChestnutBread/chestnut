import React from "react";
import Button from "../molecules/Button";
import MemberLogo from "../molecules/MemberLogo";
import FindIdForm from "../organisms/FindIdForm";
import LoginIdInput from "../molecules/LoginIdInput";
function FindPw(){
    return(
        <div>
            <h1>비밀번호 찾기</h1>
            <Button button={'PW 찾기'}/>
            <div style={{width: '100%', height: '100%', position: 'relative', background: '#FFF9EF'}}>
                <MemberLogo title={'PW찾기'} />
                <div style={{width: 786, paddingTop: 18, paddingBottom: 56, paddingLeft: 92, paddingRight: 92, left: 327, top: 250, position: 'absolute', background: '#DCB78F', borderRadius: 25, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                    <div style={{flex: '1 1 0', alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', display: 'inline-flex'}}>
                        <div style={{alignSelf: 'stretch', padding: 10, background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                            <LoginIdInput title={'ID'} content={'아이디를 입력하세요'} />
                        </div>
                        <div style={{alignSelf: 'stretch', padding: 10, background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                            <FindIdForm title={'이메일'} content={'이메일을 입력하세요'} name={'전송'} />
                        </div>
                        <div style={{alignSelf: 'stretch', padding: 10, background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                            <div style={{width: 112, height: 18, textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Jua', fontWeight: '400', wordWrap: 'break-word'}}>인증번호</div>
                            <div style={{width: 582, height: 52, position: 'relative', background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, overflow: 'hidden'}}>
                                <div style={{padding: 10, left: 0, top: 8, position: 'absolute', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                                    <div style={{color: 'black', fontSize: 16, fontFamily: 'Jua', fontWeight: '400', wordWrap: 'break-word'}}>     인증번호를 입력하세요</div>
                                </div>
                                <div style={{left: 521, top: 6, position: 'absolute', background: '#6B3906', borderRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                                    <div style={{width: 175, height: 60, textAlign: 'center', color: 'white', fontSize: 16, fontFamily: 'Jua', fontWeight: '400', wordWrap: 'break-word'}}>확인</div>
                                </div>
                            </div>
                        </div>
                        <div style={{alignSelf: 'stretch', padding: 10, background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                            <div style={{width: 135, height: 18, textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Jua', fontWeight: '400', wordWrap: 'break-word'}}>새 비밀번호</div>
                            <div style={{width: 582, paddingTop: 8, paddingBottom: 4, paddingRight: 406, background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
                                <div style={{alignSelf: 'stretch', padding: 10, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                                    <div style={{color: 'black', fontSize: 16, fontFamily: 'Jua', fontWeight: '400', wordWrap: 'break-word'}}>     비밀번호를 입력하세요</div>
                                </div>
                            </div>
                        </div>
                        <div style={{alignSelf: 'stretch', padding: 10, background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                            <div style={{width: 173, height: 18, textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Jua', fontWeight: '400', wordWrap: 'break-word'}}>  새 비밀번호 확인</div>
                            <div style={{width: 582, height: 52, position: 'relative', background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, overflow: 'hidden'}}>
                                <div style={{padding: 10, left: 0, top: 8, position: 'absolute', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                                    <div style={{color: 'black', fontSize: 16, fontFamily: 'Jua', fontWeight: '400', wordWrap: 'break-word'}}>     비밀번호를 입력하세요</div>
                                </div>
                                <div style={{left: 521, top: 6, position: 'absolute', background: '#6B3906', borderRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', display: 'inline-flex'}}>
                                    <div style={{width: 175, height: 60, textAlign: 'center', color: 'white', fontSize: 16, fontFamily: 'Jua', fontWeight: '400', wordWrap: 'break-word'}}>확인</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default FindPw;