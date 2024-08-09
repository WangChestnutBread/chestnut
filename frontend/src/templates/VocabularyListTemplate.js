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
    let [myVocabulary, setMyVocabulary] = useState(null)

    const getChapterTitle = () => {
        baseApi({
            method: 'get',
            url: '/study/chapter'
        })
        .then((res)=>{
            // console.log(res)
            setChapterTitle(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const getVocabulary = () => {
        baseApi({
            method: 'get',
            url: '/vocabulary',
            params :{
                chapter:'0',
                page:'0',
                size:'10'
            }
        })
        .then((res)=>{
            // console.log(res.data.data)
            setMyVocabulary(res.data.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    useEffect(()=>{
        Promise.all([getChapterTitle(), getVocabulary()])
        .then(()=>{console.log("호출")});
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
                chapterTitle && myVocabulary ? <VocabularyList chapterTitle={chapterTitle} content={myVocabulary.content}/> : null
            }
            

            {/* 페이지네이션 */}
            <Pagenation currentPage={""} totalPages={""} onPageChange={""}/>
        </div>
    )
}

export default VocabularyListTemplate;