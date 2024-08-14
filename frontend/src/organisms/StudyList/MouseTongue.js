import { useEffect, useState } from "react";
import baseApi from "../../api/fetchAPI";
import Mouse from "../../molecules/StudyList/Mouse";
import Tongue from "../../molecules/StudyList/Tongue";
import { useParams } from "react-router-dom";

const MouseTongue = ({params}) => {
  console.log(params);
  const [mouthData, setMouthData] = useState("");
  const [tongueData, setTongueData] = useState("");
  const { studyId } = useParams();
  useEffect(() => {
    baseApi.get(`/study/detail/${studyId}/image`).then((res) => {
      setMouthData(res.data.data.mouthImg);
      setTongueData(res.data.data.tongueImg);
    })
  }, [params.studyId])

  return (
    <div className="d-flex m-t-box">
      <div className="face-box flex-fill rounded-3 shadow m-2 ms-0 me-3">
        {/* 입모양 영역 */}
        <Mouse mouthData={mouthData} />
      </div>
      <div className="face-box flex-fill rounded-3 shadow m-2 me-0">
        {/* 혀모양 영역 */}
        <Tongue tongueData={tongueData} />
      </div>
    </div>
  );
};

export default MouseTongue;
