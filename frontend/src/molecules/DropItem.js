import { useNavigate } from "react-router-dom";
import Text20 from "../atoms/Text20";
import "./DropItem.css";

function DropItem({ img, path, menu }) {
  let navigate = useNavigate();

  return (
    <div
      className="DropItem"
      onClick={() => {
        navigate( path );
      }}
    >
      <img src={img} width="40px" />

      <Text20 text={menu} />
    </div>
  );
}

export default DropItem;
