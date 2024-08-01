import React from "react";
import BlackBoard from "../../atoms/BlackBoard";
import ChapterTitle from "../../atoms/ChapterTitle";
function ChapterList(props){
    return(
        <div className="container">
            <ChapterTitle title={props.title}/>
            <BlackBoard />
        </div>
    );
}
export default ChapterList;