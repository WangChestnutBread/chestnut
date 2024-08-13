import { useNavigate } from "react-router-dom"
import Text20 from "../../atoms/Text20"
import Text24 from "../../atoms/Text24"
import Text32 from "../../atoms/Text32"
import LastStudyButton from "../../molecules/Main/LastStudyButton"

import "./LastStudy.css"

function LastStudy({chapter, word, chapterId, studyId}) {
    
    let navigate = useNavigate()
    const handleOnClick = () => {
        navigate(`/study/detail${chapterId}/${chapterId}/${studyId}`)
    }

    return (
        <div className="LastStudy">
            <div className="LastStudyHead">
                <Text20 text="오늘도 열심히 가보자고!"/>
            </div>
            <div className="LastStudyBody">
                <div className="LastStudyChapter">
                    <div className="LastStudyChapterLeft">
                        <Text24 text="학습 현황 : "/>
                        {
                            chapter ? <Text24 text={chapter}/> : <Text24 text="자음/모음"/>
                        }
                        
                    </div>
                    <img src="/icons/LastStudyIcon.svg"/>
                </div>
                <div className="LastStudyWord">
                    {
                        word ? <Text24 text={word}/> : <Text24 text="ㄱ"/>
                    }                    
                </div>
                <LastStudyButton word={word} onClick={handleOnClick}/>
            </div>

        </div>
    )
}

export default LastStudy;