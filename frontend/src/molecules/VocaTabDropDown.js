import "./VocaTabDropDown.css";
import Dropdown from "react-bootstrap/Dropdown";

function VocaTabDropDown({ content, handleOnVocaClick }) {
  return (
    <Dropdown.Menu className="VocaTabDropdownMenu">
      {content.map((item, j) => {
        return (
          <Dropdown.Item
            className="VocaTabDropItem"
            onClick={() => handleOnVocaClick(j)}
          >
            {`Ch${item.chapterId}. ${item.chapterName}`}
          </Dropdown.Item>
        );
      })}
    </Dropdown.Menu>
  );
}

export default VocaTabDropDown;
