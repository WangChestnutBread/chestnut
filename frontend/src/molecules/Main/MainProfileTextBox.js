import "./MainProfileTextBox.css";
import MainProfileLine from "../../atoms/MainProfileLine";
import Text24 from "../../atoms/Text24";
import Text20 from "../../atoms/Text20";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseApi from "../../api/fetchAPI"

function MainProfileTextBox() {

  let navigate = useNavigate()

  return (
    <div className="MainProfileTextBox">
      {/* 첫번째 줄 - 환영인사 & 닉네임 */}
      <div className="First">
        <p style={{ fontSize: "2rem", color: "#6B3906" }}>밤톨이</p>
        <Text24 text="님 오늘도 힘내요!" />
      </div>
      <MainProfileLine />

      {/* 두번째 줄 - 모은 밤 개수 */}
      <div className="Second">
        <div className="Mine">
          <img src="/icons/MyChestNut.svg" height="31px" />
          <Text24 text="10" />
        </div>
      </div>
      <MainProfileLine />

      {/* 세번째 줄 */}
      <div className="Third">
        {/* 1. 연속 출석 일수 */}
        <div className="Attend">
          <img src="/icons/Fire.svg" />
          <Text20 text="연속" />
          <p style={{ color: "#337AF7", fontSize: "1.5rem" }}>10</p>
          <Text20 text="일 출석!" />
        </div>

        <div className="Bar">
          <img src="/image/Bar.png" width="21px" />
        </div>

        {/* 2. 내 랭킹 */}
        <div className="Ranking">
          <img src="/image/Ranking.png" height="31px" />
          <Text20 text="내 랭킹" />
          <Text24 text="2" />
          <Text24 text="위" />
        </div>
      </div>
      <MainProfileLine />

      {/* 네 번째 줄 */}
      <div className="Fourth">
        {/* 1. 내 정보 보기(정보수정) */}
        <div className="InfoChange">
          <img src="/icons/Setting.svg" />
          <Text20 text="내 정보 보기" />
        </div>
        <div className="Bar">
          <img src="/image/Bar.png" width="21px" height="100%" />
        </div>

        {/* 2. 로그아웃 */}
        <div className="Logout" onClick={()=>{
          baseApi({
            method: 'post',
            url: '/member/logout'
          })
          .then((res)=>{
            console.log(res)
            navigate('/')
          })
          .catch((err)=>{
            console.log(err)
          })
        }}>
          <Text20 text="로그아웃"/>
        </div>
      </div>
    </div>
  );
}

export default MainProfileTextBox;
