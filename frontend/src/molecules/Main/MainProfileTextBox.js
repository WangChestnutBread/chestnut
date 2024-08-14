import "./MainProfileTextBox.css";
import React, { useState } from "react";
import MainProfileLine from "../../atoms/MainProfileLine";
import Text24 from "../../atoms/Text24";
import Text20 from "../../atoms/Text20";
import { useNavigate } from "react-router-dom";
import baseApi from "../../api/fetchAPI";
import useAuthStore from "../../stores/authStore";
import CustomAlert from "../../atoms/alert";
import { Col } from "react-bootstrap";

function MainProfileTextBox({ profile }) {
  let navigate = useNavigate();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const [alertContent, setAlertContent] = useState("");

  const handleCloseAlert = () => {
    setAccessToken(undefined)
    setAlertContent(null); // Alert 닫기
    // 로그아웃하면 자동으로 랜딩으로 넘어감
    navigate("/"); 
  };

  return (
    <div className="MainProfileTextBox">
      {/* 첫번째 줄 - 환영인사 & 닉네임 */}
      <div className="First">
        <p style={{ fontSize: "2rem", color: "#6B3906" }}>{profile.nickname}</p>
        <Text24 text="님 오늘도 힘내요!" />
      </div>
      <MainProfileLine />

      {/* 두번째 줄 - 모은 밤 개수 */}
      <div className="Second">
        <div className="Mine">
          <img src="/icons/MyChestNut.svg" height="31px" />
          <Text24 text={profile.reward} />
          <span>/</span>
          <Text24 text={profile.lowerLimit} />
        </div>
      </div>
      <MainProfileLine />

      {/* 세번째 줄 */}
      <div className="Third">
        {/* 1. 연속 출석 일수 */}
        <div className="Attend">
          <img src="/icons/Fire.svg" />
          <Text20 text="연속" />
          <p style={{ color: "#337AF7", fontSize: "1.5rem" }}>
            {profile.attendanceCount}
          </p>
          <Text20 text="일 출석!" />
        </div>

        <div className="Bar">
          <img src="/image/Bar.png" width="21px" />
        </div>

        {/* 2. 내 랭킹 */}
        <div className="Ranking" onClick={()=>{navigate('/ranking')}}>
          <img src="/image/Ranking.png" height="31px" />
          <Text20 text="내 랭킹" />
          {
            profile.ranking === 0 ? <Text24 text="-" /> : <Text24 text={profile.ranking} />
          }
          <Text24 text="위" />
        </div>
      </div>
      <MainProfileLine />

      {/* 네 번째 줄 */}
      <div className="Fourth">
        {/* 1. 내 정보 보기(정보수정) */}
        <div
          className="InfoChange"
          onClick={() => {
            navigate("/myprofile/myinfo");
          }}
        >
          <img src="/icons/Setting.svg" />
          <Text20 text="내 정보 보기" />
        </div>
        <div className="Bar">
          <img src="/image/Bar.png" width="21px" height="100%" />
        </div>

        {/* 2. 로그아웃 */}
        <div className="Logout" onClick={()=>{
          baseApi({
            method: 'POST',
            url: '/member/logout'
          })
          .then((res)=>{
            console.log(res)
            setAlertContent(`<div style="display: block;">
                               로그아웃 되었습니다.
                            <div>`);
          })
          .catch((err)=>{
            console.log(err)
          })
        }}>
          <Text20 text="로그아웃"/>
        </div>
      </div>
      {alertContent && 
                <CustomAlert content={alertContent} 
                onClose={handleCloseAlert}
            />}
    </div>
  );
}

export default MainProfileTextBox;
