import Mouse from "../../molecules/StudyList/Mouse";
import Tongue from "../../molecules/StudyList/Tongue";

const MouseTongue = () => {
  return (
    <div className="d-flex">
      {/* 입모양 영역 */}
      <Mouse />
      {/* 혀모양 영역 */}
      <Tongue />
    </div>
  );
};

export default MouseTongue;
