import "./Chapter4n7Detail.css"
import "../NavbarExample.css"
import Ch4BlackBoardWithTab from "../../organisms/Ch4BlackBoardWithTab";
import Ch7BlackBoardWithTab from "../../organisms/Ch7BlackBoardWithTab";
import { useEffect, useState } from "react";
import StudyBackButton from "../../molecules/StudyBackButton";
import ChestNutButton from "../../organisms/ChestNutButton";
import QuestionMarkButton from "../../molecules/QuestionMarkButton";

function Chapter4n7Detail({data, chapterId}) {
    let [content, setContent] = useState(null)
    useEffect(()=>{
        setContent(data)
    }, [data])
    
    return (
        <div className="Chapter4n7Detail">
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
            <div className="container">
                {content && chapterId == 4 ? (
                    <Ch4BlackBoardWithTab content={content} />
                ) : content && chapterId == 7 ? (
                    <Ch7BlackBoardWithTab content={content} />
                ) : (
                    <p>로딩중입니다</p>
                )}
                
            </div>

        </div>
    )
}

export default Chapter4n7Detail;