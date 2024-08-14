import { Link } from "react-router-dom";
import Text20 from "../atoms/Text20";
import "./DropItem.css";

function DropItem({ img, path, menu }) {
  return (
    <Link to={path}
      className="DropItem"
    >
      <img src={img} alt={menu} width="40px" />
      <Text20 text={menu} />
    </Link>
  );
}

export default DropItem;
