import { useState } from "react"
import MainMenu from "../organisms/Main/MainMenu"
import "./MainTemplate.css"
import LastStudy from "../organisms/Main/LastStudy"
import MainProfile from "../organisms/Main/MainProfile"
import MainCalendar from "../organisms/Main/MainCalendar"


const MainTemplate = () => {
    let [menu, setMenu] = useState(['학습', '대화연습', '단어장', '게시판'])

    return (
        <div className="MainTemplate">
            <div className="Logo">
                <img src="/image/Logo.png" className="LogoImage"/>
            </div>
            <MainMenu menu={menu}/>
            <div className="MainStatus">
                <MainProfile/>
                <LastStudy chapter="자/모" word="나는 사과를 먹는다"/>
            </div>
            <MainCalendar/>
        </div>
    )
}

export default MainTemplate;