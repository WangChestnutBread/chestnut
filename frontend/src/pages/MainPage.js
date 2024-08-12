import MainTemplate from "../templates/MainTemplate";
import "./MainPage.css";
import useAuthStore from "../stores/authStore";
import baseApi from "../api/fetchAPI";
import axios from "axios";
import { useEffect, useState } from "react";
import OpenChatButton from "../atoms/OpenChatButton";
import Loading from "../organisms/Loading";
function MainPage() {

  const setCheckPoint = useAuthStore((state)=>state.setCheckPoint)
  
  useEffect(() => {
    baseApi.get(`/study/study-id`,).then((res) => {
      console.log(res.data.data);
      setCheckPoint(res.data.data)
    })
  },[])


  const { accessToken, setAccessToken } = useAuthStore((state) => ({
    ...state,
  }));

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
    } catch (error) {
      console.error(error);
    }
  };

  //axios 요청
  useEffect(() => {
    const fetchData = async () => {
      try {
        const promiseResult = Promise.all([getProfile(), getAttendance()]);
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

      {profile && attendance ? (
        <MainTemplate profile={profile} attendance={attendance} />
      ) : (
        <div className="loading-container">
          <Loading />
        </div>
      )}

      
    </div>
  );
}

export default MainPage;
