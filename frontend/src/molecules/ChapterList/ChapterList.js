import "./ChapterList.css";
import BlackBoard from "../../atoms/ChapterList/BlackBoard";
import Text32 from "../../atoms/Text32";

function ChapterList(props) {
  return (
    <div className="ChapterList">
      <div className="BoardBody">
        <BlackBoard />
        <div className="ChapterTitle">
          <Text32 text={props.title} />
        </div>
      </div>
    </div>
  );
}
export default ChapterList;
