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
  // const reissueToken = () => {
  //   // axios.post("https://i11d107.p.ssafy.io/chestnutApi/member/reissue",{})
  //   // .then((res) => console.log(res))
  //   baseApi.post("/member/reissue").then((res) => {
  //     console.log(res);
  //   });
  // };

  let [profile, setProfile] = useState(null);
  let [attendance, setAttendance] = useState(null);

  const getProfile = async () => {
    try {
      const response = await axios.get(
        "https://i11d107.p.ssafy.io/chestnutApi/member/info/main",
        {
          headers: { access: accessToken },
        }
      );
      setProfile(response.data.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getAttendance = async () => {
    try {
      const response = await axios.get(
        `https://i11d107.p.ssafy.io/chestnutApi/member/attendance?year=${new Date().getFullYear()}`,
        {
          headers: { access: accessToken },
        }
      );
      setAttendance(response.data.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  //axios 요청
  useEffect(() => {
    const fetchData = async () => {
      try {
        const promiseResult = Promise.all([getProfile(), getAttendance()])
      } catch (err) {
        console.error(err);
      }
      // }
    };
    if (accessToken) {
      fetchData();
    }
  }, [accessToken, setAccessToken]);

  return (
    <div className="MainPage">
      {/* <button onClick={reissueToken}>토큰 재발급 테스트</button> */}
      {profile && attendance ? (
        <MainTemplate profile={profile} attendance={attendance} />
      ) : (
        <p>로딩중입니다</p>
      )}

      <div>
        {/* 오픈 채팅 버튼 */}
        <OpenChatButton />

        {/* 챗봇 버튼 */}
      </div>
    </div>
  );
}

export default MainPage;
