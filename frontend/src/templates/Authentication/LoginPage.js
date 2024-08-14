import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MemberLogo from "../../molecules/Authentication/MemberLogo";
import LoginIdInput from "../../molecules/Authentication/LoginIdInput";
import LoginPwInput from "../../molecules/Authentication/LoginPwInput";
import Button from "../../molecules/Authentication/Button";
import BackButton from "../../atoms/BackButton";
import "../../atoms/Authentication/Page.css";
import axios from "axios";
import useAuthStore from "../../stores/authStore";
import CustomAlert from "../../atoms/alert";

function LoginPage() {
  //ID설정하는 부분에 대한 변수
  const [Id, setName] = useState("");
  //Password 설정하는 부분에 대한 변수
  const [password, setPassword] = useState("");
  //navigate=> 이동함수
  const navigate = useNavigate();
  // 액세스 토큰을 선언하는 변수
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUserId = useAuthStore((state) => state.setUserId);
  const setManager = useAuthStore((state) => state.setManager);
  const setId = useAuthStore((state) => state.setId);
  const setPw = useAuthStore((state) => state.setPw);
  const [alertContent, setAlertContent] = useState("");
  

  const handleChangeName = (event) => {
    setId(event.target.value);
    setName(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    setPw(event.target.value);
  };
  const GotoBack = () => {
    navigate("/");
  };
  const handleLogin = (event) => {
    console.log(event);
    event.preventDefault();
    axios
      .post("https://i11d107.p.ssafy.io/chestnutApi/member/login", {
        loginId: Id,
        password: password,
      })
      .then((response) => {
        if (response.data.code == 200) {
          setAccessToken(response.headers["access"]);
          setManager(response.data.data.admin);
          console.log(response);
          navigate("/main");
         
          
          // console.log("토의 열심히 하시네");
        } else if (response.data.code == 706) {
          setAlertContent(`비밀번호 혹은 아이디를<br>잘못 작성했습니다.`);
        }
        console.log(response);
        setUserId(Id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseAlert = () => {
    setAlertContent(null); // Alert 닫기
  };

  return (
    <div className="container">
      <div
        style={{
          paddingTop: 50,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <BackButton work={GotoBack} />
        <div
          style={{
            width: 786,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 22,
            display: "flex",
          }}
        >
          <MemberLogo title={"Login"} />
          <div
            style={{
              paddingLeft: 20,
              paddingRight: 30,
              paddingTop: 20,
              paddingBottom: 20,
              background: "#DCB78F",
              borderRadius: 25,
              overflow: "hidden",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <div
              style={{
                height: 246,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 14,
                display: "flex",
              }}
            >
              <LoginIdInput
                title={"ID"}
                value={Id}
                content={"아이디를 입력하세요"}
                work={handleChangeName}
              />
              <LoginPwInput
                title={"PW"}
                value={password}
                content={"비밀번호를 입력하세요"}
                work={handleChangePassword}
              />
            </div>
            <div
              style={{
                height: 108,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 27,
                display: "flex",
              }}
            >
              <Button button={"로그인"} work={handleLogin} />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Link to="/member/find-id">
                  <div className="idcheck no-underline">ID 찾기</div>
                </Link>
                <Link to="/member/password">
                  <div className="passwordcheck no-underline">
                    / PW 찾기
                    <br />
                  </div>
                </Link>
              </div>
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
export default LoginPage;
