import Mouse from "../../molecules/StudyList/Mouse";
import Tongue from "../../molecules/StudyList/tongue";

const MouseTongue = () => {
  return (
    <div className="d-flex">
      <div className="border rounded-3 shadow m-2">
        {/* 입모양 영역 */}
        <Mouse />
      </div>
      <div className="border rounded-3 shadow m-2">
        {/* 혀모양 영역 */}
        <Tongue />
      </div>
    </div>
  );
};

export default MouseTongue;
