import { useState } from "react"
import MainMenu from "../organisms/MainMenu"

const MainTemplate = () => {
    let [menu, setMenu] = useState(['학습', '대화연습', '단어장', '게시판'])

    return (
        <div>
            <MainMenu menu={menu}/>
        </div>
    )
}

export default MainTemplate;