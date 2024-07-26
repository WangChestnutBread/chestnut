import { useState } from "react"
import MainMenu from "../organisms/MainMenu"
import "./MainTemplate.css"
import LastStudyButton from "../molecules/LastStudyButton"

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