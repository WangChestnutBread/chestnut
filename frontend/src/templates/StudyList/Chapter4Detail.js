import "./Chapter4Detail.css"
import "../NavbarExample.css"
import BlackBoardWithTab from "../../organisms/BlackBoardWithTab";
import { useEffect, useState } from "react";
import StudyBackButton from "../../molecules/StudyBackButton";
import ChestNutButton from "../../organisms/ChestNutButton";
import QuestionMarkButton from "../../molecules/QuestionMarkButton";

function Chapter4Detail({data}) {
    let [content, setContent] = useState(null)
    useEffect(()=>{
        setContent(data)
    }, [])
    
    return (
        <div className="Chapter4Detail">
            {/* navbar */}
            <div className="NavbarExample">
                <div className="NavbarButton">
                    <div className="LeftButton">
                        <StudyBackButton/>
                        <ChestNutButton/>
                    </div>
                    <div className="RightButton">
                        <QuestionMarkButton/>
                    </div>
                </div>
            </div>

            {/* 칠판 콘텐츠 전체 */}
            <div>
                {
                    content ? <BlackBoardWithTab content={content}/> : <p>로딩중입니다</p>
                }
            </div>

        </div>
    )
}

export default Chapter4Detail;