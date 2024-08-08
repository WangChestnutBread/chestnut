import MainTemplate from "../templates/MainTemplate";
import "./MainPage.css";
import useAuthStore from "../stores/authStore";
import baseApi from "../api/fetchAPI";
import axios from "axios";
import { get } from "jquery";
import { useEffect, useState } from "react";
import OpenChatButton from "../atoms/OpenChatButton";
function MainPage() {
  const { accessToken, setAccessToken } = useAuthStore((state) => ({
    ...state,
  }));
  const reissueToken = () => {
    // axios.post("https://i11d107.p.ssafy.io/chestnutApi/member/reissue",{})
    // .then((res) => console.log(res))
    baseApi.post("/member/reissue").then((res) => {
      console.log(res);
    });
  };
  
  let [profile, setProfile] = useState(null);
  let [attendance, setAttendance] = useState(null)
  
  const getProfile = () => {
    return (
      baseApi({
        method: "get",
        url: "/member/info/main",
      })
        .then((res) => {
          setProfile(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        })
    )
    }

  const getAttendance = () => {
    return(
      baseApi({
        method: "get",
        url: `/member/attendance?year=${new Date().getFullYear()}`,
      })
      .then((res) => {
          setAttendance(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        })
    )
  }
  
  //axios 요청
  useEffect(()=>{
    const fetchData = async () => {
      if (accessToken) {
        try {
          await Promise.all([getProfile(), getAttendance()]);
        } catch (err) {
          console.error(err);
        } 
      }
      
    };
    fetchData();
  }, [])

  return (
    <div className="MainPage">
      <button onClick={reissueToken}>토큰 재발급 테스트</button>
      {
        profile && attendance ? (
          <MainTemplate profile={profile} attendance={attendance} />
        ) : (
          <p>새로고침을 한 번만 눌러주세요^-^</p>
        )
      }

      <div>
        {/* 오픈 채팅 버튼 */}
        <OpenChatButton/>

        {/* 챗봇 버튼 */}

      </div>
      

    </div>
  );
}

export default MainPage;
