import MainTemplate from "../templates/MainTemplate";
import useAuthStore from "../stores/authStore";
import baseApi from "../api/fetchAPI";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../organisms/Loading";
function MainPage() {

  const setCheckPoint = useAuthStore((state)=>state.setCheckPoint)
  useEffect(() => {
    // console.log("체크포인트 불러오기")
    baseApi.get(`/study/study-id`,).then((res) => {
      setCheckPoint(res.data.data)
    })
  },[setCheckPoint])


  const { accessToken, setAccessToken } = useAuthStore((state) => ({
    ...state,
  }));

  let [profile, setProfile] = useState(null);
  let [attendance, setAttendance] = useState(null);

  // 프로필 정보 가져오기
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

  // 출석 정보 가져오기
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

  useEffect(() => {
    // console.log("달력이랑 출석 불러오기")
    const fetchData = async () => {
      try {
        const promiseResult = Promise.all([getProfile(), getAttendance()]);
      } catch (err) {
        console.error(err);
      }
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
