import ChapterList from "../molecules/StudyList/ChapterList"
import BlackBoardTab from "../molecules/BlackBoardTab"

function BlackBoardWithTab({tabTitleList}) {
    return (
        <div className="BlackBoardWithTab">
            <div className="BlackBoardBody">
                <ChapterList title="Ch4. 음운변동"/>
            </div>
            <div className="VerticalLine"></div>
            <div className="TabButton">
                {
                    tabTitleList.map((tabTitle)=>{
                        <BlackBoardTab tabTitle={tabTitle}/>
                    })
                }
            </div>
        </div>
    )
}

export default BlackBoardWithTab;