import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MemberLogo from "../../molecules/Authentication/MemberLogo";
import LoginIdInput from "../../molecules/Authentication/LoginIdInput";
import Button from "../../molecules/Authentication/Button";
import BackButton from "../../atoms/BackButton";
import axios from "axios";
import Swal from 'sweetalert2';
function FindId() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const navigate = useNavigate();
    const succes = () => {
        axios.post("https://i11d107.p.ssafy.io/chestnutApi/member/find-id", {
            memberName: name,
            email: email
        })
            .then(response => {
                if (response.data.code == 200) {
                    Swal.fire({
                        icon: "info",
                        title: "ID 찾기",
                        text: `당신의 아이디는 ${response.data.data.loginId}입니다.`,
                        footer: '<a href="/member/password">비밀번호 찾기</a>'
                    });
                    navigate("/member/login");
                }
                else if (response.data.code == 714) {
                    Swal.fire({
                        icon: "error",
                        title: "ID 찾기",
                        text: "멤버 조회에 실패했습니다.",
                    });
                }
                else if (response.data.code == 713) {
                    Swal.fire({
                        icon: "error",
                        title: "ID 찾기",
                        text: "아이디와 이메일이 불일치합니다.",
                    });
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: "ID 찾기",
                        text: "알수 없는 오류가 발생했습니다.",
                        footer: '<a href="/member/password">비밀번호 찾기</a>'
                    });
                }
                console.log(response);
            })

    };
    const GotoBack = () => {
        navigate(-1);
    };
    return (
        <div className="container">
            <div style={{ padding: 50, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                <BackButton work={GotoBack} />
                <div style={{ width: 786, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 22, display: 'flex' }}>
                    <MemberLogo title={'ID 찾기'} />
                    <div style={{
                        paddingLeft: 20,
                        paddingRight: 30,
                        paddingTop: 20,
                        paddingBottom: 20, 
                        background: '#DCB78F', 
                        borderRadius: 25, 
                        overflow: 'hidden', 
                        flexDirection: 'column', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        display: 'flex'
                    }}>
                        <div style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 14, display: 'flex', marginTop: 20 }}>
                            <LoginIdInput title={'이름'} value={name} content={'이름을 입력하세요'} work={handleChangeName} />
                            <LoginIdInput title={'이메일'} value={email} content={'이메일을 입력하세요'} work={handleChangeEmail} />
                        </div>
                        <div style={{ height: 108, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 27, display: 'flex' }}>
                            <Button button={'아이디 찾기'} work={succes} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default FindId;