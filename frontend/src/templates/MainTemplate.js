import { useState } from "react"
import MainMenu from "../organisms/Main/MainMenu"
import "./MainTemplate.css"
import LastStudyButton from "../molecules/Main/LastStudyButton"

const MainTemplate = () => {
    let [menu, setMenu] = useState(['학습', '대화연습', '단어장', '게시판'])

    return (
        <div className="MainTemplate">
            <div className="Logo">
                <img src="/image/Logo.png" className="LogoImage"/>
            </div>
            <MainMenu menu={menu}/>
            <LastStudyButton/>
        </div>
    )
}

export default MainTemplate;