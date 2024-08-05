import "./MainProfile.css";
import Text20 from "../../atoms/Text20";
import MainProfileTextBox from "../../molecules/Main/MainProfileTextBox";

function MainProfile() {
  return (
    <div className="MainProfile">
      {/* 프로필 이미지 */}
      <div className="ProfileImage">
        <img src="/image/ProfileExample.png" height="200px" />
        <Text20 text="Lv2. 맑은 눈을 가진 밤송" />
      </div>

      {/* 프로필 정보 박스 */}
      <MainProfileTextBox />

      {/* 나뭇잎 이미지 */}
      <div className="LeafImage">
        <img src="/image/Leaf.png" width="49px" />
      </div>
    </div>
  );
}

export default MainProfile;
