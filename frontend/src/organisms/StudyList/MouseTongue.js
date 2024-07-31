import Mouse from "../../molecules/StudyList/mouse";
import Tongue from "../../molecules/StudyList/tongue";

const MouseTongue = () => {
  return (
    <div>
      <div>
        {/* 입모양 영역 */}
        <Mouse />
      </div>
      <div>
        {/* 혀모양 영역 */}
        <Tongue />
      </div>
    </div>
  );
};

export default MouseTongue;
