import React, { useState } from "react";
import LoginButton from "./LoginButton";
import "./Page.css";
import axios from "axios";
import baseApi from "../../api/fetchAPI";
import useAuthStore from "../../stores/authStore";
import { useNavigate } from 'react-router-dom';
import CustomAlert from "../../atoms/alert";

function LoginInputPwForm(props) {
//   console.log(props);
  const [name, setName] = useState("");
  const Id = useAuthStore.getState().id
  const password = useAuthStore.getState().pw
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setUserId = useAuthStore((state) => state.setUserId);
  const setManager = useAuthStore((state) => state.setManager);

  const [alertContent, setAlertContent] = useState("");
  const navigate = useNavigate()

  const activeEnter = (event) => {
    console.log(useAuthStore.getState());
    console.log(Id)
    console.log(password);
    
    if (event.key === "Enter") {
        console.log('성공');
        event.preventDefault();
        console.log(Id);
        console.log(password);
        axios
        .post("https://i11d107.p.ssafy.io/chestnutApi/member/login", {
          loginId: Id,
          password: password,
        })
        .then((response) => {
          if (response.data.code == 200) {
            setAccessToken(response.headers["access"]);
            setManager(response.data.data.admin);
            navigate("/main");
          } else if (response.data.code == 706) {
            setAlertContent(`비밀번호 혹은 아이디를 잘못 작성했습니다.`);
          }
          console.log(response);
          setUserId(Id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleCloseAlert = () => {
    setAlertContent(null); // Alert 닫기
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="FormBorder LoginFormFont">
      <input
        className="LoginFormBorder LoginFormFont"
        type="password"
        value={props.value}
        onChange={props.work}
        placeholder={props.content}
        onKeyDown={(e) => activeEnter(e)}
      />
      {alertContent && 
                <CustomAlert content={alertContent} 
                onClose={handleCloseAlert}
            />}
    </form>
  );
}
export default LoginInputPwForm;
