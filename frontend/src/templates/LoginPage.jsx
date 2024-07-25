import React, {useState} from "react";
import {Link} from "react-router-dom";
import MemberLogo from "../molecules/MemberLogo";
import LoginIdInput from "../molecules/LoginIdInput";
import LoginButton from "../atoms/LoginButton";
import Button from "../molecules/Button";
import BackButton from "../atoms/BackButton";
import "../atoms/Page.css";
function LoginPage(){
    const [name, setName] = useState("");

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = (event) =>{
        alert(`이름: ${name}`);
        event.preventDefault();
    };
    return(
        <div className="Page">
            <MemberLogo title={'Login'} />
            <div style={{width: 786, height: 630, left: 327, top: 232, position: 'absolute', background: '#DCB78F', borderRadius: 25, overflow: 'hidden'}}>
                <div style={{height: 246, left: 60, top: 122, position: 'absolute', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                    <LoginIdInput title={'ID'} content={'아이디를 입력하세요'} />
                    <LoginIdInput title={'PW'} content={'비밀번호를 입력하세요'} />
                </div>
                <div style={{padding: 10, left: 60, top: 403, position: 'absolute', background: '#DCB78F', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                    <input type="checkbox" name="saveId" id="Id" style={{width: 25, height: 25, position: 'relative', background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 30, border: '2px black solid'}}/>
                    <div style={{width: 187, height: 32, color: 'black', fontSize: 16, fontFamily: 'Jua', fontWeight: '400', wordWrap: 'break-word'}} >아이디 저장</div>
                </div>
                <div style={{left: 306, top: 557, position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
                    <Link to="/member/find-id">
                        <div style={{textAlign: 'center', color: 'black', fontSize: 20, fontFamily: 'Jua', fontWeight: '400', wordWrap: 'break-word'}}>ID 찾기</div>
                    </Link>
                    <Link to="/member/password">
                        <div style={{width: 108, height: 25, textAlign: 'center', color: 'black', fontSize: 20, fontFamily: 'Jua', fontWeight: '400', wordWrap: 'break-word'}}> /PW 찾기<br/></div>
                    </Link>
                
                </div>
                <Button button={'로그인'} />
            </div>
            <BackButton />
        </div>
    );
    
}
export default LoginPage;