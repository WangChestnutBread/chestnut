import "./ListBtn.css";
import { useNavigate } from "react-router-dom";



const ListBtn = () => {
  const navigate = useNavigate();
  const handleQnaClick = () => {
    navigate("/board/qna/1");
  };

  return (
    <div className="d-flex justify-content-center">
      <button className="list-btn" onClick={handleQnaClick} style={{border:"none"}}>목록</button>
    </div>
  );
};
export default ListBtn;
