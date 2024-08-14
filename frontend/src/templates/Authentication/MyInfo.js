import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MemberLogo from "../../molecules/Authentication/MemberLogo";
import BackButton from "../../atoms/BackButton";
import Button from "../../molecules/Authentication/Button";
import InfoBox from "../../molecules/Authentication/InfoBox";
import baseApi from "../../api/fetchAPI";
import CustomAlert from "../../atoms/alert";

function MyInfo() {
    const [Id, setId] = useState("");
    const [name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [birthday, setBirthday] = useState(null);
    const [birth, setBirth] = useState(null);
    const [alertContent, setAlertContent] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        baseApi({
            method: "get",
            url: "/member/info",
        })
        .then(response => {
            if (response.data.code === "200") {
                console.log(response);
                setId(response.data.data.loginId);
                setName(response.data.data.memberName);
                setEmail(response.data.data.email);
                setBirthday(response.data.data.birthday);
                setNickname(response.data.data.nickname);

                if (response.data.data.birthday) {
                    // setBirth(response.data.data.birthday);
                    let inputBirth = response.data.data.birthday;
                    let birthString = inputBirth[0]+"-"+inputBirth[1]+"-"+inputBirth[2];
                    setBirth(birthString);
                }
            } else if (response.data.code === "801") {
                setAlertContent(`잠시후 다시 시도해 주세요.`);
            } else if (response.data.code === "710") {
                setAlertContent(`사용자 정보가 존재하지 않습니다.`);
            } else if (response.data.code === "714") {
                setAlertContent(`아이디가 존재하지 않습니다.`);
            } else if (response.data.code) {
                setAlertContent(`열람 권한이 없습니다.`);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    const navigateToPurchase = () => {
        navigate("/myprofile/edit");
    };

    const GotoBack = () => {
        navigate("/main");
    };

    const handleCloseAlert = () => {
        setAlertContent(null); // Alert 닫기
      };

    return (
        <div className="container">
            <div style={{paddingTop: 50, justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                <BackButton work={GotoBack} />
                <div style={{width: 786, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 22, display: 'flex'}}>
                    <MemberLogo title={'내정보'} />
                    <div style={{paddingLeft: 30, paddingRight: 30, paddingTop: 40, paddingBottom: 20, background: '#DCB78F', borderRadius: 25, overflow: 'hidden', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'flex', marginBottom: 40}}>
                        <div style={{alignSelf: 'stretch', height: 92, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                            <InfoBox title={'닉네임'} name={nickname} />
                        </div>
                        <div style={{alignSelf: 'stretch', height: 102, padding: 10, background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                            <InfoBox title={'이름'} name={name} />
                        </div>
                        <div style={{alignSelf: 'stretch', height: 102, padding: 10, background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                            <InfoBox title={'생년월일'} name={birth} />
                        </div>
                        <div style={{alignSelf: 'stretch', height: 102, padding: 10, background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                            <InfoBox title={'이메일'} name={Email} />
                        </div>
                        <div style={{alignSelf: 'stretch', height: 102,padding: 10, background: 'rgba(255, 249, 239, 0)', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 10, display: 'flex'}}>
                            <InfoBox title={'ID'} name={Id} />
                        </div>
                        <div style={{height: 108, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 27, display: 'flex'}}>
                            <Button button={'내 정보 수정'} work={navigateToPurchase}/>
                        </div>
                    </div>
                </div>
            </div>
            {alertContent && 
                <CustomAlert content={alertContent} 
                onClose={handleCloseAlert}
            />}
        </div>
    );
}

export default MyInfo;