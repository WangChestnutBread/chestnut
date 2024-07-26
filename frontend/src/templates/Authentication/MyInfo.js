import React from "react";
import MemberLogo from "../../molecules/Authentication/MemberLogo";
import BackButton from "../../atoms/BackButton";
import Button from "../../molecules/Authentication/Button";
import PasswordButton from "../../molecules/Authentication/PasswordButton";
import InfoBox from "../../molecules/Authentication/InfoBox";
function MyInfo(){
    return(
        <div style={{width: '100%', height: '100%', position: 'relative', background: '#FFF9EF'}}>
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
                <div style={{paddingLeft: 10, paddingRight: 10, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                    <div style={{color: 'black', fontSize: 16, fontFamily: 'Jua', fontWeight: '400', wordWrap: 'break-word'}}>생년월일</div>
                </div>
                <div style={{width: 582, justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                    <div style={{width: 152, padding: 10, background: '#D9D9D9', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                        <div style={{width: 161, height: 29, color: 'black', fontSize: 16, fontFamily: 'Jua', fontWeight: '400', wordWrap: 'break-word'}}>1987</div>
                    </div>
                    <div style={{width: 152, padding: 10, background: '#D9D9D9', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                        <div style={{width: 161, height: 29, color: 'black', fontSize: 16, fontFamily: 'Jua', fontWeight: '400', wordWrap: 'break-word'}}>05</div>
                    </div>
                    <div style={{width: 152, padding: 10, background: '#D9D9D9', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 10, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                        <div style={{width: 161, height: 29, color: 'black', fontSize: 16, fontFamily: 'Jua', fontWeight: '400', wordWrap: 'break-word'}}>21</div>
                    </div>
                    <div style={{width: 96, paddingTop: 15, paddingBottom: 15, paddingLeft: 21, paddingRight: 10, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                        <div style={{textAlign: 'center', color: 'black', fontSize: 16, fontFamily: 'Jua', fontWeight: '400', wordWrap: 'break-word'}}>선택사항</div>
                    </div>
                </div>
            </div>
            <div style={{alignSelf: 'stretch', height: 102, padding: 10, background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                <InfoBox title={'이메일'} name={'bamtol@example.com'} />
            </div>
            <div style={{alignSelf: 'stretch', height: 102,padding: 10, background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                <InfoBox title={'ID'} name={'1245K'} />
            </div>
           <Button />
        </div>
    </div>
    <BackButton />
</div>
    );
}
export default MyInfo;