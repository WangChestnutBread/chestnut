import React from "react";
import MemberLogo from "../../molecules/Authentication/MemberLogo";
import LoginIdInput from "../../molecules/Authentication/LoginIdInput";
import Button from "../../molecules/Authentication/Button";
import BackButton from "../../atoms/BackButton";
function FindId(){
    return(
        <div className="Page">
            <MemberLogo title={'ID 찾기'} />
            <div style={{width: 786, height: 630, left: 327, top: 232, position: 'absolute', background: '#DCB78F', borderRadius: 25, overflow: 'hidden'}}>
                <div style={{height: 246, left: 92, top: 122, position: 'absolute', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 14, display: 'inline-flex'}}>
                    <LoginIdInput title={'이름'} content={'이름을 입력하세요'} />
                    <LoginIdInput title={'이메일'} content={'이메일을 입력하세요'} />
                </div>
                <Button />
            </div>
            <BackButton />
        </div>
    );
}
export default FindId;