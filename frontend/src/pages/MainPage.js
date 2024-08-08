import MainTemplate from "../templates/MainTemplate";
import "./MainPage.css";
import useAuthStore from "../stores/authStore";
import baseApi from "../api/fetchAPI";
import axios from "axios";
import { get } from "jquery";
import { useEffect, useState } from "react";
function MainPage() {
  const { accessToken, setAccessToken } = useAuthStore((state) => ({
    ...state,
  }));
  const reissueToken = () => {
    // axios.post("https://i11d107.p.ssafy.io/chestnutApi/member/reissue",{})
    // .then((res) => console.log(res))
    baseApi.post('/member/reissue').then((res) => {
      console.log(res);
    })
  };
  
  //axios 요청 모음
  let [profile, setProfile] = useState(null)
  useEffect(()=>{
    // 프로필 정보 요청
    baseApi({
      method: 'get',
      url: '/member/info/main'
    })
    .then((res)=>{
      setProfile(res.data.data)
    })
    .catch((err)=>{
      console.log(err)
    })

    return () => {
      setProfile(null)
    }
  }, [])

  return (
    <div className="MainPage">
      <button onClick={reissueToken}>토큰 재발급 테스트</button>
      {
        profile ? <MainTemplate profile={profile}/> : <p>로딩중입니다</p>
      }
    </div>
  );
}

export default MainPage;
