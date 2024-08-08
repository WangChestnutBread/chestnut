import "./VocabularyListTemplate.css"
import QuestionMarkButton from "../molecules/QuestionMarkButton";
import StudyBackButton from "../molecules/StudyBackButton";
import ChestNutButton from "../organisms/ChestNutButton";
import VocabularyList from "../organisms/VocabularyList";
import "./NavbarExample.css"
import Pagenation from "../atoms/Pagenation";
import { useEffect, useState } from "react";
import baseApi from "../api/fetchAPI";


function VocabularyListTemplate() {
    let [chapterTitle, setChapterTitle] = useState(null)

    useEffect(()=>{
        baseApi({
            method: 'get',
            url: '/study/chapter'
        })
        .then((res)=>{
            setChapterTitle(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [])

    return (
        <div className="VocabularyListTemplate">
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



            {/* 단어장 칠판 */}
            {
                chapterTitle ? <VocabularyList chapterTitle={chapterTitle}/> : null
            }
            

            {/* 페이지네이션 */}
            <Pagenation/>
        </div>
    )
}

export default VocabularyListTemplate;