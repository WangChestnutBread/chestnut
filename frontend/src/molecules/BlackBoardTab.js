import "./BlackBoardTab.css"
import Text24 from "../atoms/Text24"


function BlackBoardTab({tabTitle, isActive, onClick}) {

    return (
        <button className={`BlackBoardTab ${
            isActive ? 'active' : ''
        }`} onClick={onClick}>
            <Text24 text={tabTitle}/>
        </button>
    )
}

export default BlackBoardTab;