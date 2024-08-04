import "./Chapter4Detail.css"
import BlackBoardWithTab from "../../organisms/BlackBoardWithTab";
import { useEffect, useState } from "react";

function Chapter4Detail({data}) {
    let [content, setContent] = useState(null)
    useEffect(()=>{
        setContent(data)
    }, [])
    
    return (
        <div>
            <div>
                {
                    content ? <BlackBoardWithTab content={content}/> : <p>로딩중입니다</p>
                }
            </div>

        </div>
    )
}

export default Chapter4Detail;