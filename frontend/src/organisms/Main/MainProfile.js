import "./MainProfile.css";
import Text20 from "../../atoms/Text20";
import MainProfileTextBox from "../../molecules/Main/MainProfileTextBox";
import { Col } from "react-bootstrap";

function MainProfile({profile}) {
  return (
    <Col xl={8} className="MainProfile">
      {/* 프로필 이미지 */}
      <div className="ProfileImage">
        <img src={profile.avatarImgUrl} height="200px" />
        <Text20 text={`Lv${profile.avatarId}. ${profile.avatarName}`} />
      </div>

      {/* 프로필 정보 박스 */}
      <MainProfileTextBox profile={profile}/>

      {/* 나뭇잎 이미지 */}
      <div className="LeafImage">
        <img src="/image/Leaf.png" width="49px" />
      </div>
    </Col>
  );
}

export default MainProfile;
