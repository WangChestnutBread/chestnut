import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import MemberLogo from "../../molecules/Authentication/MemberLogo";
import LoginIdInput from "../../molecules/Authentication/LoginIdInput";
import LoginPwInput from "../../molecules/Authentication/LoginPwInput";
import Button from "../../molecules/Authentication/Button";
import BackButton from "../../atoms/BackButton";
import "../../atoms/Authentication/Page.css";
import axios from "axios";
function LoginPage(){
    const [Id, setName] = useState("");
    const [password, setPassword]= useState("");
    const navigate = useNavigate();

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangePassword =(event)=>{
        setPassword(event.target.value);
    };
    const GotoBack=()=>{
        navigate(-1);
    };
    const success=(event)=>{
        console.log(Id);
        console.log(password);
        axios.post("https://i11d107.p.ssafy.io/chestnutApi/member/login/",{
            loginId : "duli123",
            password: 'duli123!',
        },)
        .then(response =>{
            if(response.data.code==200){
                navigate("/main");
                
            }
            else if(response.data.code==706){
                alert("비밀번호 혹은 아이디를 잘못 작성했습니다.");
              
            } 
            console.log(response)
        })
        .catch(error=>{
            console.log(error);
        })
        event.preventDefault();
    };
    return(
        <div className="container">
            <div style={{paddingTop: 50, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                <BackButton work={GotoBack} />
                <div style={{width: 786, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 22, display: 'flex'}}>
                <MemberLogo title={'Login'} />
                    <div style={{paddingLeft: 91, paddingRight: 91, paddingTop: 48, paddingBottom: 48, background: '#DCB78F', borderRadius: 25, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 27, display: 'flex'}}>
                        <div style={{height: 246, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 14, display: 'flex'}}>
                        <LoginIdInput title={'ID'} value={Id} content={'아이디를 입력하세요'} work={handleChangeName}/>
                        <LoginPwInput title={'PW'} value={password} content={'비밀번호를 입력하세요'} work={handleChangePassword}/>
                        </div>
                        <div style={{paddingTop: 10, paddingBottom: 10, background: '#DCB78F', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'inline-flex'}}>
                            <input type="checkbox" name="saveId" id="Id" style={{width: 25, height: 25, position: 'relative', background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 30, border: '2px black solid'}}/>
                            <div style={{width: 187, height: 32, color: 'black', fontSize: 16, fontFamily: 'Jua', fontWeight: '400', wordWrap: 'break-word'}} >아이디 저장</div>
                        </div>
                        <div style={{height: 108, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 27, display: 'flex'}}>
                            <Button button={'로그인'} work={success}/>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <Link to="/member/find-id">
                                    <div className="idcheck no-underline">ID 찾기</div>
                                </Link>
                                <Link to="/member/password">
                                    <div className="passwordcheck no-underline">/ PW 찾기<br/></div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LoginPage;

