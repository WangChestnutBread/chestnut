import Mouse from "../../molecules/StudyList/Mouse";
import Tongue from "../../molecules/StudyList/Tongue";

const MouseTongue = () => {
  return (
    <div className="d-flex m-t-box">
      <div className="face-box rounded-3 shadow m-2">
        {/* 입모양 영역 */}
        <Mouse />
      </div>
      <div className="face-box rounded-3 shadow m-2">
        {/* 혀모양 영역 */}
        <Tongue />
      </div>
    </div>
  );
};

export default MouseTongue;
