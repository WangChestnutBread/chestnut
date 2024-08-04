import { useEffect, useState } from "react";
import baseApi from "../../api/fetchAPI";
import Mouse from "../../molecules/StudyList/Mouse";
import Tongue from "../../molecules/StudyList/Tongue";
import { json, useParams } from "react-router-dom";
import useAuthStore from "../../stores/authStore";

const MouseTongue = () => {
  const [mouthData, setMouthData] = useState("");
  const [tongueData, setTongueData] = useState("");
  const { studyId } = useParams();
  useEffect(() => {
      baseApi.get(`/study/detail/1/image`).then((res) => {
      setMouthData(res.data.mouthImg);
      setTongueData(res.data.tongueImg);
      console.log(res.data.data.tongueImg);
      
      
    });
  }, []);

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
