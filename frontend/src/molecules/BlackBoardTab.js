import "./BlackBoardTab.css"
import Text24 from "../atoms/Text24"
import { useState } from "react";


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