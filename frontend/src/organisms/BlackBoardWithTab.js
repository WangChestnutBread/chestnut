import "./BlackBoardWithTab.css";
import ChapterList from "../molecules/StudyList/ChapterList";
import BlackBoardTab from "../molecules/BlackBoardTab";

function BlackBoardWithTab({ tabTitleList }) {
    // let [ch4Tab, setch4Tab] = useState(0)

  return (
    <div className="container BlackBoardWithTab">
      <div className="BlackBoardWithLine">
        <div className="BlackBoardBody">
          <ChapterList title="Ch4. 음운변동" />
          <div className="TabButton">
            {tabTitleList.map((tabTitle, i) => {
              return <BlackBoardTab tabTitle={tabTitle} key={i} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlackBoardWithTab;
