import "./TabDropDown.css";
import Dropdown from "react-bootstrap/Dropdown";

function TabDropDown({ content, handleOnClick }) {
  return (
    <Dropdown.Menu className="TabDropdownMenu">
      {content.map((item, i) => {
        return (
          <Dropdown.Item className="TabDropItem" onClick={()=>{handleOnClick(i)}}>
            {item.categoryContent}
          </Dropdown.Item>
        );
      })}
    </Dropdown.Menu>
  );
}

export default TabDropDown;
