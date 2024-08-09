import Text20 from "../atoms/Text20";
import "./TabDropItem.css";

function TabDropItem({ menu, handleOnClick }) {
  return (
    <div className="TabDropItem" onClick={handleOnClick}>
      <Text20 text={menu} />
    </div>
  );
}

export default TabDropItem;
