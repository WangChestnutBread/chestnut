import "./ListBtn.css";
import { useNavigate } from "react-router-dom";



const ListBtn = () => {
  const navigate = useNavigate();
  const handleQnaClick = () => {
    navigate("/board/qna/1");
  };

  return (
    <div className="d-flex justify-content-start mb-2 mt-5">
      <button className="list-btn" onClick={handleQnaClick} style={{border:"none", width: "100px", height: "45px"}}>게시판 목록</button>
    </div>
  );
};
export default ListBtn;
