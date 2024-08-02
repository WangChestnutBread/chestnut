import "./BlackBoardTab.css"
import Text24 from "../atoms/Text24"
import { useState } from "react";


function BlackBoardTab({tabTitle}) {
    let [isActive, setIsActive] = useState(false)
    return (
        <button className={`BlackBoardTab ${
            isActive ? 'active' : ''
        }`} onClick={()=>{setIsActive(!isActive)}}>
            <Text24 text={tabTitle}/>
        </button>
    )
}

export default BlackBoardTab;