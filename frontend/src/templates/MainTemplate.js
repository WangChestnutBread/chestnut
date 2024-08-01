import { useState } from "react"
import MainMenu from "../organisms/Main/MainMenu"
import "./MainTemplate.css"
import LastStudy from "../organisms/Main/LastStudy"
import MainProfile from "../organisms/Main/MainProfile"
import MainCalendar from "../organisms/Main/MainCalendar"


const MainTemplate = () => {
    let [menu, setMenu] = useState([
        {'name': '학습', 'path': ""}, 
        {'name': '대화연습', 'path': ""}, 
        {'name': '단어장', 'path': ""},
        {'name': '게시판', 'path': "/board"}])

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